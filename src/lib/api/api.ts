import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const countryApi = createApi({
  reducerPath: 'countryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://nyc3.digitaloceanspaces.com/',
  }),
  endpoints: (builder) => ({
    getCountryList: builder.query<CountryList, undefined>({
      query: () => `owid-public/data/co2/owid-co2-data.json`,
    }),
  }),
});
export const { useGetCountryListQuery } = countryApi;
