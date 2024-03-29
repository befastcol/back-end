import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from "http";
import { Server as SocketIOServer } from "socket.io";

import deliveryRoutes from "./src/routes/deliveries";
import userRoutes from "./src/routes/users";
import {
  updateCourierLocation,
  updateCourierStatus,
  removeCreditFromCourier,
} from "./src/controllers/users";
import { acceptDelivery, endDelivery } from "./src/controllers/deliveries";

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
  socket.on("updateLocation", (data) => {
    updateCourierLocation(data);

    if (data.deliveryId) {
      socket.to(data.deliveryId).emit("locationChanged", data);
    }
  });

  //When users create a delivery they join a room with the deliveryId
  socket.on("joinDeliveryRoom", ({ deliveryId }) => {
    socket.join(deliveryId);
  });

  //When couriers start working they create a courier room
  socket.on("joinCourierRoom", ({ courierId }) => {
    socket.join(courierId);
  });

  //When couriers accept a service they join the same room and emmit a message
  socket.on("serviceAccepted", async ({ courierId, deliveryId }) => {
    try {
      await acceptDelivery({ status: "in_progress", courierId, deliveryId });
      await updateCourierStatus({ status: "busy", courierId });

      socket.join(deliveryId);
      socket.to(deliveryId).emit("serviceAccepted", { courierId });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("serviceFinished", async ({ courierId, deliveryId }) => {
    try {
      await endDelivery({ status: "completed", deliveryId });
      await updateCourierStatus({ status: "available", courierId });
      await removeCreditFromCourier({ courierId });

      socket.to(deliveryId).emit("serviceFinished", { courierId });
      socket.leave(deliveryId);
    } catch (e) {
      console.log(e);
    }
  });
});

export { io };

server.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT || 3000}`)
);
