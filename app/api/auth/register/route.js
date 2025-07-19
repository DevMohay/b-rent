import { NextResponse } from "next/server"
import User from "../../../model/user"
import bcrypt from "bcryptjs"
import dbConnect from "../../../config/db"

export async function POST(req) {
  await dbConnect()

  const { name, email, password, phone, profilePicture } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 })
  }

  const existingUser = await User.findOne({ email })

  if (existingUser) {
    return NextResponse.json({ message: "User already exists." }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    name,
    email,
    password: hashedPassword,
    phone,
    profilePicture,
  })

  await user.save()

  return NextResponse.json({ message: "User created successfully." }, { status: 201 })
}