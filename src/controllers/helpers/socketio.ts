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
  io.emit(courierId, deliveryInfo);

  // Establece un temporizador para esperar la respuesta del courier
  setTimeout(async () => {
    // Verificar si la entrega ha sido aceptada por el courier actual
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
      // Notifica al siguiente courier
      notifyCourier(couriers, deliveryInfo, index + 1);
    }
  }, 10000); // Espera 10 segundos para la respuesta
};
