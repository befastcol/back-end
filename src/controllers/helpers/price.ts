export const calculatePrice = (distance: number) => {
  if (distance <= 2000) {
    return 30;
  } else if (distance <= 4000) {
    return 35;
  } else if (distance <= 5000) {
    return 40;
  } else if (distance <= 6000) {
    return 45;
  } else if (distance <= 7000) {
    return 50;
  } else if (distance <= 9000) {
    return 55;
  } else {
    return 60;
  }
};
