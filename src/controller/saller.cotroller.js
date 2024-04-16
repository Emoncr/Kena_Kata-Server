import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/JwtHelper.js";

const prisma = new PrismaClient();

export const sellerSignUp = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const updateRole = prisma.User.update({
      where: { id: userId },
      data: { role: "SELLER" },
    });
    const creatSeller = prisma.seller.create({
      data: req.body,
    });

    const result = await prisma.$transaction([updateRole, creatSeller]);

    // Structure result data
    const selletInfo = {
      sellerId: result[2].id || null,
      userId: result[1].id || null,
      name: result[1].name || null,
      email: result[1].email || null,
      role: result[1].role || null,
      brandName: result[2].brandName || null,
      brandDesc: result[2].brandDesc || null,
      brandLogo: result[2].brandLogo || null,
      address: result[2].address || null,
      phone: result[2].phone || null,
    };

    // Genarate new token
    const token = generateToken({
      email: result[1].email,
      id: result[1].id,
      role: result[1].role,
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
      .json(successResponse("Seller account created successfully", selletInfo));
  } catch (error) {
    next(error);
  }
};
