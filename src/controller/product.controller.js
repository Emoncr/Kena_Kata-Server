import { PrismaClient } from "@prisma/client";
import { successResponse } from "../utils/apiResponse.js";

const prisma = new PrismaClient();

export const createProduct = async (req, res, next) => {
  const body = req.body;
  try {
    const product = await prisma.product.create({ data: body });
    res
      .status(201)
      .json(successResponse("Product created successfully", product));
  } catch (error) {
    next(error);
  }
};
