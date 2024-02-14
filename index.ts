import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import deliveryRoutes from "./src/routes/deliveries";
import userRoutes from "./src/routes/users";

dotenv.config();

const app = express();
app.use(express.json());

const mongoUri: string = process.env.MONGO_URI || "";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api/deliveries", deliveryRoutes);
app.use("/api/users", userRoutes);

const server = http.createServer(app);
const io = new SocketIOServer(server);

io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  socket.on("joinDeliveryRoom", (deliveryId) => {
    socket.join(deliveryId);
  });

  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

export { io };

const port: number = parseInt(process.env.PORT || "3000", 10);

server.listen(port, () => console.log(`Server running on port ${port}`));
