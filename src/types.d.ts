declare interface CountryData {
  year?: number;
  population?: number;
  co2?: number;
  co2_per_capita?: number;
  methane?: number;
  oil_co2?: number;
  temperature_change_from_co2?: number;
}

declare type CountryList = {
  [key: string]: {
    iso_code: string;
    data: CountryData[];
  };
};

declare type CountryListItemType = {
  name: string;
  isoCode: string;
  population: number | undefined | 'N/A';
};
