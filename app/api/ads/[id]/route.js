import { NextResponse } from "next/server";
import dbConnect from "../../../config/db";
import Ad from "../../../model/ad";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  const { id } = params;
  await dbConnect();
  try {
    const ad = await Ad.findById(id).populate(
      "user",
      "name email phone profilePicture"
    );
    if (!ad) {
      return NextResponse.json({ message: "Ad not found" }, { status: 404 });
    }
    return NextResponse.json(ad, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}



export async function PUT(req, { params }) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await req.json();

    const updateData = {};
    if (body.status) {
      updateData.status = body.status;
    }
    if (body.featured !== undefined) {
      updateData.featured = body.featured;
    }

    const updatedAd = await Ad.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedAd) {
      return NextResponse.json({ message: "Ad not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Ad updated successfully" }, { status: 200 });
  } catch (error) {
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
    const { id } = params;
    const { role, id: userId } = session.user;

    const ad = await Ad.findById(id);

    if (!ad) {
      return NextResponse.json({ message: "Ad not found" }, { status: 404 });
    }

    // Admin can delete any ad, seller can only delete their own
    if (role === "admin" || ad.user.toString() === userId) {
      await ad.deleteOne();
      return NextResponse.json({ message: "Ad deleted successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}