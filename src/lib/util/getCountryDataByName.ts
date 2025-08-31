export const getCountryDataByName = (
  name: string,
  countries: CountryList
): CountryData[] | undefined => {
  return countries[name]?.data;
};
