const geolib = require("geolib");
import { PointInterface } from "../../interfaces/custom";
import { UserInterface } from "../../interfaces/user";

export const getClosestCouriers = async (
  origin: PointInterface,
  couriers: UserInterface[]
): Promise<UserInterface[]> => {
  const sortedCouriers = couriers.sort((a, b) => {
    if (!a.currentLocation || !b.currentLocation) {
      return 0;
    }

    const originPoint = {
      latitude: origin.coordinates[1],
      longitude: origin.coordinates[0],
    };
    const courierAPoint = {
      latitude: a.currentLocation.coordinates[1],
      longitude: a.currentLocation.coordinates[0],
    };
    const courierBPoint = {
      latitude: b.currentLocation.coordinates[1],
      longitude: b.currentLocation.coordinates[0],
    };

    const distanceA = geolib.getDistance(originPoint, courierAPoint);
    const distanceB = geolib.getDistance(originPoint, courierBPoint);

    return distanceA - distanceB;
  });

  return sortedCouriers;
};
