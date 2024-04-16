import express from "express";
import { sellerSignUp } from "../controller/saller.cotroller.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/signup", verifyToken, sellerSignUp);
export default router;
