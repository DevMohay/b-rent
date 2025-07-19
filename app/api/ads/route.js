import { NextResponse } from "next/server";
import dbConnect from "../../config/db";
import Ad from "../../model/ad";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from "../../../utils/cloudinary";

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

      if (role !== "seller" && role !== "admin") {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
      }

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
        images: imageUploadResults.map((result) => result.secure_url),
        video: videoUploadResult ? videoUploadResult.secure_url : null,
      });

      await newAd.save();
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

      let query = {};

      if (seller === "me" && session && session.user.role === "seller") {
        query.user = session.user.id;
      } else if (featured === "true") {
        query.featured = true;
        query.status = "approved";
      } else {
        if (session && session.user.role === "admin") {
          // No additional filters for admin
        } else {
          query.status = "approved";
        }
      }

      if (category) {
        query.category = category;
      }

      const ads = await Ad.find(query).populate("user", "name email");
      return NextResponse.json(ads, { status: 200 });
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
