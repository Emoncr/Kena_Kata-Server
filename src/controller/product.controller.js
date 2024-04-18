import { PrismaClient } from "@prisma/client";
import { errorResponse, successResponse } from "../utils/apiResponse.js";

const prisma = new PrismaClient();

export const createProduct = async (req, res, next) => {
  const reqBody = req.body;
  console.log(req.userRole);
  if (req.userId !== reqBody.sellerId)
    // Checking valid user
    return next(errorResponse(401, "Unauthorized request"));

  if (req.userRole !== "SELLER")
    // Checking user role
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

export const getProducts = async (req, res, next) => {
  try {
    const searchText = req.query.searchQuery || "";
    const sortPrice = req.query.sortbyPrice || "";
    const sortTime = req.query.sortbyTime || ""; // latest first
    const discout = req.query.discount || false; // Bollean
    const bestSales = req.query.bestSales || false; // boolean
    const hot = req.query.hotdeals || false; // boolean
    const type = req.query.type || ""; // best, featured , popular,
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
        discount: discout,
        mark: type,
        discountPercentage: {
          gte: hot ? 5 : 0,
        },
        sold: {
          gte: bestSales ? 2 : 0,
        },
      },
      select: {
        id: true,
        title: true,
        price: true,
        discount: true,
        discountPercentage: true,
        type: true,
        images: true,
        createdAt: true,
        mark: true,
      },
      take: limit,
      skip: skip,
      orderBy: {
        price: sortPrice,
        createdAt: sortTime, // latest first
      },
      include: {
        ratings: true,
      },
    });
    res
      .status(200)
      .json(successResponse("Products fetched successfully", products));
  } catch (error) {
    next(error);
  }
};
