import mongoose from "mongoose";
import { Delivery } from "../../models/delivery";
import { io } from "../../..";

export const watchDeliveryChanges = (deliveryId: mongoose.Types.ObjectId) => {
  const deliveryChangeStream = Delivery.watch([
    {
      $match: {
        "documentKey._id": deliveryId,
        "updateDescription.updatedFields.courier": { $exists: true },
      },
    },
  ]);

  deliveryChangeStream.on("change", (change) => {
    io.emit("deliveryUpdate", {
      deliveryId: deliveryId.toString(),
      update: change.updateDescription.updatedFields,
    });
  });
};
