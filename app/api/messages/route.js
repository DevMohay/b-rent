import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import connectDB from '../../config/db';
import Message from '../../model/message';
import User from '../../model/user';
import Ad from '../../model/ad';
import mongoose from 'mongoose';

// POST - Send a new message
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { receiverId, adId, content } = await request.json();

    if (!receiverId || !adId || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Verify ad exists
    const ad = await Ad.findById(adId);
    if (!ad) {
      return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
    }

    // Verify receiver exists
    const receiver = await User.findById(receiverId);
    if (!receiver) {
      return NextResponse.json({ error: 'Receiver not found' }, { status: 404 });
    }

    // Create message
    const message = new Message({
      sender: session.user.id,
      receiver: receiverId,
      ad: adId,
      content: content.trim()
    });

    await message.save();

    // Populate sender info for response
    await message.populate('sender', 'name profilePicture');
    
    return NextResponse.json({ 
      success: true, 
      message: message 
    }, { status: 201 });

  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET - Get conversations for current user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const adId = searchParams.get('adId');
    const userId = searchParams.get('userId');

    if (adId && userId) {
      // Get specific conversation between two users for an ad
      const messages = await Message.find({
        ad: adId,
        $or: [
          { sender: session.user.id, receiver: userId },
          { sender: userId, receiver: session.user.id }
        ]
      })
      .populate('sender', 'name profilePicture')
      .populate('receiver', 'name profilePicture')
      .sort({ createdAt: 1 });

      return NextResponse.json({ success: true, messages });
    }

    if (adId) {
      // Get all conversations for a specific ad (for seller)
      const ad = await Ad.findById(adId);
      if (!ad) {
        return NextResponse.json({ error: 'Ad not found' }, { status: 404 });
      }

      // Check if user is the ad owner
      if (ad.user.toString() !== session.user.id) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      // Get unique users who messaged about this ad
      const conversations = await Message.aggregate([
        {
          $match: {
            ad: new mongoose.Types.ObjectId(adId),
            receiver: new mongoose.Types.ObjectId(session.user.id)
          }
        },
        {
          $group: {
            _id: '$sender',
            lastMessage: { $last: '$content' },
            lastMessageTime: { $last: '$createdAt' },
            unreadCount: { $sum: { $cond: [{ $eq: ['$isRead', false] }, 1, 0] } }
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $unwind: '$user'
        },
        {
          $project: {
            _id: 1,
            user: {
              _id: '$user._id',
              name: '$user.name',
              profilePicture: '$user.profilePicture'
            },
            lastMessage: 1,
            lastMessageTime: 1,
            unreadCount: 1
          }
        },
        {
          $sort: { lastMessageTime: -1 }
        }
      ]);

      return NextResponse.json({ success: true, conversations });
    }

    // Get all ads with message counts for seller dashboard
    const userAds = await Ad.find({ user: session.user.id }).select('_id title images');
    
    const adsWithMessageCounts = await Promise.all(
      userAds.map(async (ad) => {
        const messageCount = await Message.countDocuments({
          ad: ad._id,
          receiver: session.user.id
        });
        
        const unreadCount = await Message.countDocuments({
          ad: ad._id,
          receiver: session.user.id,
          isRead: false
        });

        return {
          ...ad.toObject(),
          messageCount,
          unreadCount
        };
      })
    );

    return NextResponse.json({ 
      success: true, 
      ads: adsWithMessageCounts 
    });

  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}