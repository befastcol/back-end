import { io } from "../../..";
import { DeliveryInterface } from "../../interfaces/delivery";
import { UserInterface } from "../../interfaces/user";
import { Delivery } from "../../models/delivery";

export const notifyCourier = async (
  couriers: UserInterface[],
  deliveryInfo: DeliveryInterface,
  index = 0
) => {
  if (index >= couriers.length) {
    console.log(
      "Todos los couriers han sido notificados y ninguno ha aceptado la entrega."
    );
    return;
  }

  const courierId = couriers[index].id;

  io.to(courierId).emit("deliveryFound", {
    deliveryInfo,
    deadline: new Date(Date.now() + 10000),
  });
  setTimeout(async () => {
    const delivery = await Delivery.findById(deliveryInfo.id);
    if (
      delivery &&
      delivery.courier &&
      delivery.courier?.toString() === courierId?.toString() &&
      delivery.status === "in_progress"
    ) {
      console.log(`El courier ${courierId} ha aceptado la entrega.`);
    } else {
      console.log(
        `El courier ${courierId} no respondió. Notificando al siguiente courier.`
      );

      notifyCourier(couriers, deliveryInfo, index + 1);
    }
  }, 10000);
};
