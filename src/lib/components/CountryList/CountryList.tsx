import CountryListItem from './CountryListItem.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchCountryList } from '@/lib/util/fetchCountries.ts';
import { getScrollbarSize, Grid } from 'react-window';
import { useState } from 'react';
import { getCountryListItems } from '@/lib/util/getCountryListItems.ts';
import { indexToColumn } from '@/lib/util/indexToColumn.ts';

const CountryList = () => {
  const [size] = useState(getScrollbarSize);
  const { data } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: fetchCountryList,
  });

  const countries = getCountryListItems(data);

  function columnWidth(index: number) {
    switch (indexToColumn(index)) {
      case 'name': {
        return 250;
      }
      case 'isoCode': {
        return 150;
      }
      case 'population': {
        return 100;
      }
      default: {
        return 100;
      }
    }
  }
  return (
    <div className="flex flex-col grow">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="flex-1">name</div>
        <div className="flex-1">iso</div>
        <div className="mr-16">population</div>
        <div className="h-full" style={{ width: size }}></div>
      </div>
      <div className="grow h-[700px]">
        <Grid
          cellComponent={CountryListItem}
          cellProps={{ countries }}
          columnCount={3}
          columnWidth={columnWidth}
          rowCount={countries.length}
          rowHeight={25}
        />
      </div>
    </div>
  );
};

export default CountryList;
