import express from "express";
import cors from "cors";

const app = express();

// Using CORS
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({ origin: "https://kena-kata-client.vercel.app/", credentials: true })
  );
} else {
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
}

// Using Express Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Importing Routes
import productRoute from "./routes/product.route.js";
import userRoute from "./routes/user.route.js";




// Routes
app.use("/api/product", productRoute);
app.use("/api/user", userRoute);




export default app;
