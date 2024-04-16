import express from "express";
import { sellerSignUp } from "../controller/saller.cotroller.js";

const router = express.Router();

router.post("/signup", sellerSignUp);

export default router;
