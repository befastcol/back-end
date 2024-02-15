export const calculatePrice = (distance: number, duration: number) => {
  const basePrice = 20;
  const pricePerMeter = 0.002;
  const pricePerSecond = 0.001;

  let price = basePrice + distance * pricePerMeter + duration * pricePerSecond;

  price = Math.round(price / 5) * 5;
  return price;
};
