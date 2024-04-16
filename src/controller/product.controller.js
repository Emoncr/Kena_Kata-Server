import { PrismaClient } from "@prisma/client";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const prisma = new PrismaClient();

export const createProduct = async (req, res, next) => {
  const reqBody = req.body;
  if (req.userRole !== "SELLER" || req.userRole !== "ADMIN")
    return next(errorResponse(401, `${req.userRole} can't create product`));

  try {
    const product = await prisma.product.create({ data: reqBody });
    res
      .status(201)
      .json(successResponse("Product created successfully", product));
  } catch (error) {
    next(error);
  }
};
