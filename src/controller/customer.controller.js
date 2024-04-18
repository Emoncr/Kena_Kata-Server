import { errorResponse, successResponse } from "../utils/apiResponse.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCustomer = async (req, res, next) => {
  if (req.userId !== req.body.userId) {
    return next(errorResponse(401, "Unauthorized request, Please Login!"));
  }
  const reqBody = req.body;
  try {
    const customer = await prisma.Customer.create({
      data: reqBody,
    });
    res
      .status(201)
      .json(successResponse("Customer created successfully", customer));
  } catch (error) {
    next(error);
  }
};
