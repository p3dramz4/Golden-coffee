import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { NextResponse } from "next/server";
import { roles } from "@/utils/constants";
import { serialize } from "cookie";
import connectToDB from "@/configs/db";

export async function POST(req) {
  try {
    await connectToDB();
    console.log("Connected to database successfully");

    const body = await req.json();
    console.log("Request body:", body);

    const { name, phone, email, password } = body;

    const isUserExist = await UserModel.findOne({
      $or: [{ name }, { email }, { phone }],
    });

    if (isUserExist) {
      return NextResponse.json(
        {
          message: "The username or email or phone exist already !!",
        },
        {
          status: 422,
        }
      );
    }

    const hashedPassword = await hashPassword(password);
    console.log("Password hashed successfully");

    const accessToken = generateAccessToken({ name });
    console.log("Access token generated successfully");

    const users = await UserModel.find({});
    await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });
    console.log("User created successfully");

    const accessTokenCookie = serialize("token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const response = NextResponse.json(
      { message: "User signed up successfully" },
      { status: 201 }
    );

    response.headers.set("Set-Cookie", accessTokenCookie);
    console.log("Response created successfully");

    return response;
  } catch (err) {
    console.error("Error occurred:", err.message);
    return NextResponse.json(
      { message: err.message || "An error occurred during signup" },
      { status: 500 }
    );
  }
}
