import { PointInterface } from "../../interfaces/custom";
import { UserInterface } from "../../interfaces/user";
import { User } from "../../models/user";

// Función para calcular la distancia entre dos puntos geográficos
function calculateDistance(
  origin: PointInterface,
  destination: PointInterface
): number {
  // Usa la fórmula de Haversine o cualquier otra fórmula adecuada para calcular la distancia
  // entre dos puntos geográficos
  // Esta es una simplificación, considera usar una librería como geolib para una implementación más robusta
  const R = 6371; // Radio de la Tierra en km
  const dLat =
    ((destination.coordinates[1] - origin.coordinates[1]) * Math.PI) / 180;
  const dLon =
    ((destination.coordinates[0] - origin.coordinates[0]) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((origin.coordinates[1] * Math.PI) / 180) *
      Math.cos((destination.coordinates[1] * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distancia en km
  return distance;
}

export const getClosestCouriers = async (
  origin: PointInterface
): Promise<UserInterface[]> => {
  const couriers: UserInterface[] = await User.find({
    role: "courier",
    status: "active",
    "originLocation.city": origin.city,
  });

  const sortedCouriers = couriers.sort((a, b) => {
    // Asegúrate de que ambos mensajeros tengan una ubicación actual definida antes de calcular la distancia
    if (!a.currentLocation || !b.currentLocation) {
      return 0; // Puedes decidir cómo manejar este caso. Aquí, simplemente los dejamos sin cambios en el orden
    }

    const distanceA = calculateDistance(origin, a.currentLocation);
    const distanceB = calculateDistance(origin, b.currentLocation);
    return distanceA - distanceB;
  });

  return sortedCouriers;
};
