import express from "express";
import { sallerSignUp } from "../controller/saller.cotroller.js";

const router = express.Router();

router.post("/signup", sallerSignUp);

export default router;
