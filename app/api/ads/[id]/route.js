import { NextResponse } from "next/server";
import dbConnect from "../../../config/db";
import Ad from "../../../model/ad";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import cloudinary from "../../../../utils/cloudinary";
import { withCache, generateCacheKey, invalidateCache } from "../../../../utils/cacheWrapper";

export async function GET(req, { params }) {
  const { id } = await params;
  
  try {
    // Generate cache key for single ad
    const cacheKey = `ad_detail_${id}`;
    
    // Use Redis cache for GET requests with proper serialization
    const ad = await withCache(
      async () => {
        await dbConnect();
        const result = await Ad.findById(id)
          .populate("user", "name email phone profilePicture whatsapp imo")
          .lean(); // Convert Mongoose document to plain JavaScript object
        if (!result) return null;
        return result;
      },
      cacheKey,
      // Cache for 5 minutes (300 seconds)
      300
    );
    
    if (!ad) {
      return NextResponse.json({ message: "Ad not found" }, { status: 404 });
    }
    
    return NextResponse.json(ad, { status: 200 });
  } catch (error) {
    console.error("Error fetching ad details:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const ad = await Ad.findById(id);

    if (!ad) {
      return NextResponse.json({ message: "Ad not found" }, { status: 404 });
    }

    const contentType = req.headers.get("content-type") || "";

    // Admin JSON-based status/featured update
    if (contentType.includes("application/json")) {
      if (session.user.role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

      const body = await req.json();
      const updateData = {};
      if (body.status) updateData.status = body.status;
      if (body.featured !== undefined) updateData.featured = body.featured;

      const updatedAd = await Ad.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedAd) {
        return NextResponse.json({ message: "Ad not found" }, { status: 404 });
      }
      
      // Invalidate both the specific ad cache and the general ads cache
      await invalidateCache(`ad_detail_${id}`);
      await invalidateCache('ads');
      
      return NextResponse.json({ message: "Ad updated successfully" }, { status: 200 });
    }

    // Seller/Admin multipart edit (fields + optional media)
    if (!contentType.includes("multipart/form-data")) {
      // Try to detect formData anyway
      try {
        await req.formData();
      } catch {
        return NextResponse.json({ message: "Unsupported content type" }, { status: 400 });
      }
    }

    // Only owner or admin can edit full ad
    if (session.user.role !== "admin" && ad.user.toString() !== session.user.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const formData = await req.formData();
    const dataJson = formData.get("data");
    if (!dataJson) {
      return NextResponse.json({ message: "Invalid data format" }, { status: 400 });
    }

    const data = JSON.parse(dataJson);

    // Update scalar fields (excluding media)
    Object.keys(data).forEach((key) => {
      if (key !== "images" && key !== "video") {
        ad[key] = data[key];
      }
    });

    // Optional image uploads
    const images = formData.getAll("images");
    if (images && images.length > 0 && images[0] && images[0] !== "undefined") {
      const imageUploadPromises = images.map(async (image) => {
        const imageBuffer = Buffer.from(await image.arrayBuffer());
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              resource_type: "image",
              folder: "b-rent-ads-images",
              transformation: [{ width: 720, quality: "auto" }],
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(imageBuffer);
        });
      });
      const imageUploadResults = await Promise.all(imageUploadPromises);
      ad.images = imageUploadResults.map((r) => r.secure_url);
    }

    // Optional video upload
    const video = formData.get("video");
    if (video && video !== "undefined") {
      const videoBuffer = Buffer.from(await video.arrayBuffer());
      const videoUploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { resource_type: "video", folder: "b-rent-ads-videos" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(videoBuffer);
      });
      ad.video = videoUploadResult.secure_url;
    }

    await ad.save();
    
    // Invalidate both the specific ad cache and the general ads cache
    await invalidateCache(`ad_detail_${id}`);
    await invalidateCache('ads');
    
    return NextResponse.json({ message: "Ad updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error updating ad:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const { role, id: userId } = session.user;

    const ad = await Ad.findById(id);

    if (!ad) {
      return NextResponse.json({ message: "Ad not found" }, { status: 404 });
    }

    // Admin can delete any ad, seller can only delete their own
    if (role === "admin" || ad.user.toString() === userId) {
      await ad.deleteOne();
      
      // Invalidate both the specific ad cache and the general ads cache
      await invalidateCache(`ad_detail_${id}`);
      await invalidateCache('ads');
      
      return NextResponse.json({ message: "Ad deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}