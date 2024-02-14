import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import deliveries from "./src/routes/deliveries";
import users from "./src/routes/users";

dotenv.config();

const app = express();
app.use(express.json());

const mongoUri: string = process.env.MONGO_URI || "";

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api/deliveries", deliveries);
app.use("/api/users", users);

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

server.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);
