import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/JwtHelper.js";

const prisma = new PrismaClient();

// ----------- USER SING UP CONTROLLER -------------//
export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    const result = await prisma.User.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });
    const { password, otp, ...rest } = result;
    res.status(200).json(successResponse("User created successfully", rest));
  } catch (error) {
    next(error);
  }
};

// ----------- USER SING IN CONTROLLER -------------//
export const singIn = async (req, res, next) => {
  const { email, pass } = req.body;
  try {
    const user = await prisma.User.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res
        .status(400)
        .json(errorResponse(400, "User not found with this email"));
    }
    const isMatch = bcrypt.compareSync(pass, user.password);
    if (!isMatch) {
      return res.status(400).json(errorResponse(400, "Authentication failed"));
    }
    const { password, otp, ...rest } = user;

    const token = generateToken({ email: user.email, id: user._id });
    const expirationDuration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //FOR 7 DAYS

    res
      // SETTIING COOKIES
      .cookie("token", token, {
        expires: expirationDuration,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      })
      .status(200)
      .json(successResponse("User logged in successfully", rest));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
