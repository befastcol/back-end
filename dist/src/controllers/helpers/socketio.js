"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchDeliveryChanges = void 0;
const delivery_1 = require("../../models/delivery");
const __1 = require("../../..");
const watchDeliveryChanges = (deliveryId) => {
    const deliveryChangeStream = delivery_1.Delivery.watch([
        {
            $match: {
                "documentKey._id": deliveryId,
                "updateDescription.updatedFields.courier": { $exists: true },
            },
        },
    ]);
    deliveryChangeStream.on("change", (change) => {
        __1.io.emit("deliveryUpdate", {
            deliveryId: deliveryId.toString(),
            update: change.updateDescription.updatedFields,
        });
    });
};
exports.watchDeliveryChanges = watchDeliveryChanges;
