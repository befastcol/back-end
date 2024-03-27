export const normalizeCityName = (cityName: string) => {
  return cityName
    .toLowerCase()
    .replace(/^ciudad de\s+/, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
