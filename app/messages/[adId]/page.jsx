"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import axios from '../../../utils/axiosInstance';
import { FiSend, FiArrowLeft, FiUser } from 'react-icons/fi';
import moment from 'moment';
import Loading from '../../loading';
import { io } from 'socket.io-client';

export default function MessagesPage({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ad, setAd] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [adId, setAdId] = useState(null);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  // Get adId from params
  useEffect(() => {
    const getAdId = async () => {
      const { adId: paramAdId } = await params;
      setAdId(paramAdId);
    };
    getAdId();
  }, [params]);

  // Redirect if not logged in
  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }
  }, [session, status, router]);

  // Fetch ad details and conversations
  useEffect(() => {
    if (!session || !adId) return;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch ad details
        const adResponse = await axios.get(`/ads/${adId}`);
        setAd(adResponse.data);
        
        // Check if user is the ad owner
        if (adResponse.data.user._id === session.user.id) {
          // Fetch conversations for seller
          const conversationsResponse = await axios.get(`/messages?adId=${adId}`);
          setConversations(conversationsResponse.data.conversations || []);
        } else {
          // For regular user, set the ad owner as the only conversation
          setSelectedUser({
            _id: adResponse.data.user._id,
            user: adResponse.data.user,
            lastMessage: '',
            lastMessageTime: new Date(),
            unreadCount: 0
          });
          
          // Fetch messages between user and ad owner
          const messagesResponse = await axios.get(
            `/messages?adId=${adId}&userId=${adResponse.data.user._id}`
          );
          setMessages(messagesResponse.data.messages || []);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, adId]);

  // Socket.io connection and real-time messaging
  useEffect(() => {
    if (!session || !adId) return;

    // Initialize socket connection
    socketRef.current = io(process.env.NODE_ENV === 'production' ? 'https://your-domain.com' : 'http://localhost:3000');
    
    // Join the ad room
    socketRef.current.emit('join-room', adId);

    // Listen for incoming messages
    socketRef.current.on('receive-message', (messageData) => {
      // Only add message if it's not from the current user (to avoid duplicates)
      if (messageData.sender !== session.user.id) {
        setMessages(prev => [...prev, messageData]);
      }
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [session, adId]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle conversation selection (for sellers)
  const handleConversationSelect = async (conversation) => {
    setSelectedUser(conversation);
    
    try {
      const response = await axios.get(
        `/messages?adId=${adId}&userId=${conversation._id}`
      );
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Send message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUser || sending) return;

    setSending(true);
    try {
      const response = await axios.post('/messages', {
        receiverId: selectedUser._id || selectedUser.user._id,
        adId: adId,
        content: newMessage.trim()
      });

      if (response.data.success) {
        const messageData = {
          ...response.data.message,
          sender: session.user.id,
          receiver: selectedUser._id || selectedUser.user._id,
          adId: adId,
          content: newMessage.trim()
        };

        // Add message to local state
        setMessages(prev => [...prev, response.data.message]);
        
        // Emit message via socket for real-time delivery
        if (socketRef.current) {
          socketRef.current.emit('send-message', messageData);
        }
        
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  if (status === 'loading' || loading) {
    return <Loading />;
  }

  if (!session) {
    return null;
  }

  const isAdOwner = ad?.user._id === session.user.id;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="text-xl" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <p className="text-gray-600">{ad?.title}</p>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden" style={{ height: '70vh' }}>
          <div className="flex h-full">
            
            {/* Left Sidebar - Conversations (for sellers) or Ad Owner (for users) */}
            {isAdOwner ? (
              <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Conversations</h3>
                  <p className="text-sm text-gray-600">{conversations.length} people messaged</p>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                  {conversations.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                      No messages yet
                    </div>
                  ) : (
                    conversations.map((conversation) => (
                      <div
                        key={conversation._id}
                        onClick={() => handleConversationSelect(conversation)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                          selectedUser?._id === conversation._id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            {conversation.user.profilePicture ? (
                              <img
                                src={conversation.user.profilePicture}
                                alt={conversation.user.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <FiUser className="text-gray-600" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 truncate">
                              {conversation.user.name}
                            </p>
                            <p className="text-sm text-gray-600 truncate">
                              {conversation.lastMessage}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-gray-500">
                              {moment(conversation.lastMessageTime).format('MMM DD')}
                            </p>
                            {conversation.unreadCount > 0 && (
                              <span className="inline-block bg-blue-500 text-white text-xs rounded-full px-2 py-1 mt-1">
                                {conversation.unreadCount}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="w-1/3 border-r border-gray-200 flex flex-col">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Contact</h3>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      {ad?.user.profilePicture ? (
                        <img
                          src={ad.user.profilePicture}
                          alt={ad.user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <FiUser className="text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{ad?.user.name}</p>
                      <p className="text-sm text-gray-600">Ad Owner</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right Side - Messages */}
            <div className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  {/* Messages Header */}
                  <div className="p-4 border-b border-gray-200 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        {(selectedUser.user?.profilePicture || selectedUser.profilePicture) ? (
                          <img
                            src={selectedUser.user?.profilePicture || selectedUser.profilePicture}
                            alt={selectedUser.user?.name || selectedUser.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-gray-600 text-sm" />
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {selectedUser.user?.name || selectedUser.name}
                      </h3>
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 ? (
                      <div className="text-center text-gray-500 mt-8">
                        No messages yet. Start the conversation!
                      </div>
                    ) : (
                      messages.map((message) => (
                        <div
                          key={message._id}
                          className={`flex ${
                            message.sender._id === session.user.id ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender._id === session.user.id
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                          >
                            <p>{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${
                                message.sender._id === session.user.id
                                  ? 'text-blue-100'
                                  : 'text-gray-500'
                              }`}
                            >
                              {moment(message.createdAt).format('HH:mm')}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={sending}
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || sending}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <FiSend />
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  {isAdOwner ? 'Select a conversation to start messaging' : 'Loading...'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}