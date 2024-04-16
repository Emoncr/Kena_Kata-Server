import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../utils/JwtHelper.js";

const prisma = new PrismaClient();

export const sallerSignUp = async (req, res, next) => {
  const { password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  req.body.password = hashedPassword;
  
  try {
    const result = await prisma.Seller.create({
      data: req.body,
    });
    const { password, otp, role, ...rest } = result;
    res
      .status(200)
      .json(successResponse("Seller account created successfully", rest));
  } catch (error) {
    next(error);
  }
};
