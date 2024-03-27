export const normalizeCityName = (cityName: String) => {
  return cityName
    .toLowerCase()
    .replace(/^ciudad de\s+/, "")
    .normalize("NFD") // Descompone los caracteres en combinaciones de caracteres base y diacríticos.
    .replace(/[\u0300-\u036f]/g, ""); // Elimina los diacríticos (acentos).
};
