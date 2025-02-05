import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePhone,
  validatePassword,
  verifyPassword,
} from "@/utils/auth";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { serialize } from "cookie";
import { NextResponse } from "next/server"; 

export async function POST(req) {
  try {
    await connectToDB();
    console.log("Connected to database successfully");

    const body = await req.json();
    console.log("Request body:", body);

    const { email, phone, password } = body;

    if (!email && !phone) {
      return new NextResponse(
        JSON.stringify({ message: "Email or phone is required" }),
        { status: 400 }
      );
    }

    const isValidEmail = email ? validateEmail(email) : true;
    const isValidPhone = phone ? validatePhone(phone) : true;
    const isValidPassword = validatePassword(password);

    if (
      (!isValidEmail && email) ||
      (!isValidPhone && phone) ||
      !isValidPassword
    ) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid email, phone, or password" }),
        { status: 419 }
      );
    }

    const user = await UserModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 422,
      });
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPasswordWithHash) {
      return new NextResponse(
        JSON.stringify({ message: "Email, phone, or password is not correct" }),
        { status: 401 }
      );
    }

    const identifier = email || phone;
    const accessToken = generateAccessToken({ identifier });
    const refreshToken = generateRefreshToken({ identifier });

    console.log("Access Token:", accessToken);
    console.log("Refresh Token:", refreshToken);

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      { $set: { refreshToken } }
    );

    const isProduction = process.env.NODE_ENV === "production";

    const accessTokenCookie = serialize("token", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const refreshTokenCookie = serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    console.log("AccessTokenCookie:", accessTokenCookie);
    console.log("RefreshTokenCookie:", refreshTokenCookie);

    const response = new NextResponse(
      JSON.stringify({ message: "User logged in successfully :))" }),
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `${accessTokenCookie}; ${refreshTokenCookie}`
    );

    return response;
  } catch (err) {
    console.error("Error occurred:", err.message);
    return new NextResponse(
      JSON.stringify({
        message: err.message || "An error occurred during login",
      }),
      { status: 500 }
    );
  }
}
