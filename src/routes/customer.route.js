import express from "express";
import { createCustomer } from "../controller/customer.controller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createCustomer);



export default router;





