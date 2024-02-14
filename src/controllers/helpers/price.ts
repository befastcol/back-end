export const calculatePrice = (distance: number, duration: number) => {
  const distanceFactor = 56000;
  const timeFactor = 120;
  const basePrice = 15;

  const price = Math.round(
    distance / distanceFactor + duration / timeFactor + basePrice
  );

  return price;
};
