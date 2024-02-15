"use strict";
// import { User } from "../../models/user";
// export const startDeliveryAssignment = async (delivery: any) => {
//   const nearbyCouriers = await getNearbyCouriers(delivery.origin.coordinates);
//   // 2. Inicia el proceso de notificación y asignación temporal
//   // notifyCouriersSequentially(nearbyCouriers, delivery._id);
// };
// const getNearbyCouriers = async (originCoordinates) => {
//   // Esta función es un esquema. Deberás ajustarla según tu base de datos y esquema de datos.
//   const MAX_DISTANCE = 5000; // Max distancia en metros para considerar 'cercano'
//   // Suponiendo que usas MongoDB con un índice geoespacial en el campo 'location'
//   const nearbyCouriers = await User.find({
//     'location': {
//       $near: {
//         $geometry: {
//            type: "Point",
//            coordinates: originCoordinates // [longitud, latitud]
//         },
//         $maxDistance: MAX_DISTANCE,
//       }
//     },
//     'available': true // Asumiendo que hay un campo que indica si el repartidor está disponible
//   });
//   return nearbyCouriers;
// };
