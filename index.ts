import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from "./src/routes/userRoutes";
import deliveryRoutes from "./src/routes/deliveryRoutes";

dotenv.config();

const app = express();
app.use(express.json());

const mongoUri: string = process.env.MONGO_URI || "mongodb://localhost/myapp";

mongoose
  .connect(mongoUri)

  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api/user", userRoutes);
app.use("/api/delivery", deliveryRoutes);

const port: number = parseInt(process.env.PORT || "3000", 10);

app.listen(port, () => console.log(`Server running on port ${port}`));
