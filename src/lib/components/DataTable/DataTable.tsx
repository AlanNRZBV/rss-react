import { useQueryClient } from '@tanstack/react-query';
import { getCountryDataByName } from '@/lib/util/getCountryDataByName.ts';
import { useAppSelector } from '@/lib/providers/store.ts';
import {
  selectColumns,
  selectCurrentCountry,
} from '@/lib/features/appSlice.ts';
import { Grid } from 'react-window';
import DataTableItem from '@/lib/components/DataTable/DataTableItem.tsx';

const DataTable = () => {
  const currentCountry = useAppSelector(selectCurrentCountry);
  const selectedColumns = useAppSelector(selectColumns);
  const queryClient = useQueryClient();
  const countriesData = queryClient.getQueryData<CountryList>(['countries']);

  console.log(countriesData);

  if (!currentCountry) return <div>select country to load data</div>;
  if (!countriesData)
    return <div>have nothing to display. try to reload page</div>;

  const countryData = getCountryDataByName(currentCountry, countriesData);

  if (!countryData) return <div>data extraction error</div>;

  function columnWidth(index: number) {
    switch (selectedColumns[index]) {
      case 'year': {
        return 75;
      }
      case 'co2': {
        return 125;
      }
      case 'population': {
        return 125;
      }
      case 'co2_per_capita': {
        return 125;
      }
      case 'methane': {
        return 125;
      }
      case 'oil_co2': {
        return 125;
      }
      case 'gdp': {
        return 125;
      }
      default: {
        return 100;
      }
    }
  }

  return (
    <div className="flex flex-col grow">
      <div className="grow h-[700px]">
        <Grid
          cellComponent={DataTableItem}
          cellProps={{
            dataList: countryData,
            selectedColumns: selectedColumns,
          }}
          columnCount={selectedColumns.length}
          columnWidth={columnWidth}
          rowCount={countryData.length}
          rowHeight={25}
        />
      </div>
    </div>
  );
};

export default DataTable;
