import express from "express";
import { createCustomer } from "../controller/customer.controller.js";

const router = express.Router();

router.post("/create", createCustomer);



export default router;
