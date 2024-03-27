export const normalizeCityName = (cityName: string) => {
  // Paso 1: Convertir a minúsculas
  let normalized = cityName.toLowerCase();

  // Paso 2: Eliminar prefijos comunes como "ciudad de"
  normalized = normalized.replace(/^ciudad de\s+/, "");

  normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return normalized;
};
