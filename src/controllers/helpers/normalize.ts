export const normalizeCityName = (cityName: string) => {
  // Paso 1: Convertir a minúsculas
  let normalized = cityName.toLowerCase();

  // Paso 2: Eliminar prefijos comunes como "ciudad de"
  normalized = normalized.replace(/^ciudad de\s+/, "");

  // Paso 3: Eliminar acentos y caracteres especiales
  normalized = normalized.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  return normalized;
};
