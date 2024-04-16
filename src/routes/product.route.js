import express from "express";
import { createProduct } from "../controller/product.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createProduct);

export default router;
