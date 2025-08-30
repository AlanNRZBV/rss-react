export const fetchCountryList = async (): Promise<CountryList> => {
  const response = await fetch(
    `https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch country list');
  }
  return response.json();
};
