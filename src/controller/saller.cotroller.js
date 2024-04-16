import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/JwtHelper.js";

const prisma = new PrismaClient();

export const sellerSignUp = async (req, res, next) => {
  const { userId } = req.body;

  if (req.userId !== userId)
    return next(errorResponse(401, "User is not valid"));
  if (req.role !== "SELLER" || req.role !== "ADMIN")
    return next(errorResponse(401, `Email already registered as ${req.role}`));

  try {
    const updateRole = prisma.User.update({
      where: { id: userId },
      data: { role: "SELLER" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImg: true,
      },
    });
    const creatSeller = prisma.seller.create({
      data: req.body,
    });

    const result = await prisma.$transaction([updateRole, creatSeller]);

    // Genarate new token
    const token = generateToken({
      email: req.userEmail,
      id: req.userId,
      role: "SELLER",
    });
    const expirationDuration = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //FOR 7 DAYS

    res
      .cookie("token", token, {
        expires: expirationDuration,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      })
      .status(200)
      .json(successResponse("Seller account created successfully", result));
  } catch (error) {
    console.log(error);
    next(error);
  }
};
