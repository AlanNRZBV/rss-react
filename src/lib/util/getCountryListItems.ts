export const getCountryListItems = (data: CountryList): CountryListItemType[] =>
  Object.entries(data).map(([name, { iso_code, data: countryData }]) => {
    let population: number | undefined;
    for (let i = countryData.length - 1; i >= 0; i--) {
      if (countryData[i].population !== undefined) {
        population = countryData[i].population;
        break;
      }
    }
    return { name, isoCode: iso_code, population };
  });
