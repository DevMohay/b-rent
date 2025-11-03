import { NextResponse } from "next/server";
import dbConnect from "../../config/db";
import User from "../../model/user";
import Ad from "../../model/ad";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const adId = searchParams.get("adId");

  try {
    const user = await User.findById(session.user.id).populate({
      path: "wishlist",
      select: "title price images category rentOrSale status",
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (adId) {
      const wishlisted = user.wishlist.some((a) => a._id.toString() === adId);
      return NextResponse.json({ wishlisted }, { status: 200 });
    }

    return NextResponse.json(user.wishlist, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { adId } = body;

    if (!adId) {
      return NextResponse.json({ message: "adId is required" }, { status: 400 });
    }

    const adExists = await Ad.findById(adId).select("_id");
    if (!adExists) {
      return NextResponse.json({ message: "Ad not found" }, { status: 404 });
    }

    await User.findByIdAndUpdate(
      session.user.id,
      { $addToSet: { wishlist: adId } },
      { new: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const adId = searchParams.get("adId");

    if (!adId) {
      return NextResponse.json({ message: "adId is required" }, { status: 400 });
    }

    await User.findByIdAndUpdate(
      session.user.id,
      { $pull: { wishlist: adId } },
      { new: true }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}