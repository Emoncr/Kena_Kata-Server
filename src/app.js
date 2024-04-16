import express from "express";
import cors from "cors";
import { apiError } from "./middlewares/apiError.js";
import cookieParser from "cookie-parser";

// Importing Routes
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";
import sellerRoute from "./routes/saller.route.js";

const app = express();

// Using CORS
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: ["https://kena-kata-client.vercel.app/", "*"],
      credentials: true,
    })
  );
} else {
  app.use(cors({ origin: ["http://localhost:3000", "*"], credentials: true }));
}

// Using Express Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// Routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);
app.use("/api/seller", sellerRoute);

// Error Handling
app.use(apiError);

export default app;
