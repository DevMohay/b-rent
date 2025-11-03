import { NextResponse } from "next/server";
import dbConnect from "../../config/db";
import Ad from "../../model/ad";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from "../../../utils/cloudinary";
import User from "../../model/user";
import { withCache, generateCacheKey, invalidateCache } from "../../../utils/cacheWrapper";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    try {
      const formData = await req.formData();
      const data = formData.get("data");
      const images = formData.getAll("images");
      const video = formData.get("video");

      if (!data) {
        return NextResponse.json(
          { message: "No data provided" },
          { status: 400 }
        );
      }

      const body = JSON.parse(data);
      console.log("Parsed body in /api/ads:", body);
      const { role, id: userId } = session.user;

      // Allow user, seller, and admin to post ads
      if (role !== "user" && role !== "seller" && role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      // Fetch seller info snapshot
      const seller = await User.findById(userId).select("name email phone whatsapp imo profilePicture");

      const imageUploadPromises = images.map(async (image) => {
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "b-rent-ads-images" ,
              transformation: [
                {width: 720 , quality: 'auto',}
              ]
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(imageBuffer);
        });
      });

      let videoUploadResult = null;
      if (video) {
        const videoBuffer = Buffer.from(await video.arrayBuffer());
        videoUploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "video", folder: "b-rent-ads-videos" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(videoBuffer);
        });
      }

      const imageUploadResults = await Promise.all(imageUploadPromises);

      const newAd = new Ad({
        ...body,
        user: userId,
        sellerSnapshot: seller ? {
          name: seller.name,
          email: seller.email,
          phone: seller.phone,
          whatsapp: seller.whatsapp,
          imo: seller.imo,
          profilePicture: seller.profilePicture,
        } : undefined,
        images: imageUploadResults.map((result) => result.secure_url),
        video: videoUploadResult ? videoUploadResult.secure_url : null,
      });

      await newAd.save();
      
      // Invalidate all ads cache keys when a new ad is created
      await invalidateCache('ads');
      
      return NextResponse.json(newAd, { status: 201 });
    } catch (error) {
      console.error("Error in POST /api/ads:", error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } else if (req.method === "GET") {
    try {
      const session = await getServerSession(authOptions);
      const { searchParams } = new URL(req.url);
      const featured = searchParams.get("featured");
      const category = searchParams.get("category");
      const seller = searchParams.get("seller");
      const limit = parseInt(searchParams.get("limit") || "10");
      const page = parseInt(searchParams.get("page") || "1");
      const skip = (page - 1) * limit;

      let query = {};

      if (seller === "me" && session && session.user?.id) {
        // Return only the current user's ads (works for user or seller)
        query.user = session.user.id;
      } else if (featured === "true") {
        query.featured = true;
        query.status = "approved";
      } else {
        if (session && session.user?.role === "admin") {
          // Admin sees all ads regardless of status
        } else {
          // Public and non-admin users only see approved ads
          query.status = "approved";
        }
      }

      if (category) {
        query.category = category;
      }

      // Generate cache key based on query parameters
      const cacheKey = generateCacheKey('ads', {
        featured: featured || '',
        category: category || '',
        seller: seller || '',
        userId: seller === "me" ? session?.user?.id : '',
        role: session?.user?.role || 'public',
        limit,
        page
      });

      // Use Redis cache for GET requests with proper serialization
      const result = await withCache(
        async () => {
          await dbConnect();
          const totalAds = await Ad.countDocuments(query);
          const ads = await Ad.find(query)
            .populate("user", "name email")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(); // Convert Mongoose documents to plain JavaScript objects

          // Convert to plain object to ensure proper serialization
          const serializedData = {
            ads: JSON.parse(JSON.stringify(ads)),
            totalPages: Math.ceil(totalAds / limit),
            currentPage: page
          };
          
          console.log("✅ Redis caching working properly for: " + cacheKey);
          return serializedData;
        },
        cacheKey,
        // Cache for 5 minutes (300 seconds)
        300
      );
      
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: `Method ${req.method} Not Allowed` },
      { status: 405 }
    );
  }
}

export { handler as GET, handler as POST };
