import express from "express";
import { createProduct,getProducts } from "../controller/product.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createProduct);
router.get("/all", getProducts)

export default router;