import { NextResponse } from "next/server";
import User from "../../../model/user";
import bcrypt from "bcryptjs";
import dbConnect from "../../../config/db";
import cloudinary from "../../../../utils/cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  await dbConnect();

  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const whatsapp = formData.get("whatsapp") || "";
  const imo = formData.get("imo") || "";
  const profilePicture = formData.get("profilePicture");

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 }
    );
  }

  // Ensure at least one contact number is provided
  if (!whatsapp && !imo) {
    return NextResponse.json(
      { message: "Provide WhatsApp or IMO number." },
      { status: 400 }
    );
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { message: "User already exists." },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let profilePictureUrl = "";

  if (profilePicture) {
    const fileBuffer = await profilePicture.arrayBuffer();
    const mimeType = profilePicture.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");
    const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: "profile-pictures",
    });
    profilePictureUrl = result.secure_url;
  }

  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    whatsapp,
    imo,
    profilePicture: profilePictureUrl,
  });

  await user.save();

  return NextResponse.json(
    { message: "User created successfully." },
    { status: 201 }
  );
}
