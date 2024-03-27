export const normalizeCityName = (cityName: string) => {
  let normalized = cityName.toLowerCase();

  normalized = normalized.replace(/^ciudad de\s+/, "");

  return normalized;
};
