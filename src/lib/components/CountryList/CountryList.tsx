import CountryListItem from './CountryListItem.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchCountryList } from '@/lib/util/getCountries.ts';
import { List } from 'react-window';

const CountryList = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: fetchCountryList,
  });

  const countryNames: string[] = Object.keys(data);

  return (
    <div className="flex flex-col grow">
      <h3>Country list</h3>
      <div className="grow h-[500px]">
        <List
          rowComponent={CountryListItem}
          rowCount={countryNames.length}
          rowHeight={25}
          rowProps={{ names: countryNames }}
        />
      </div>
    </div>
  );
};

export default CountryList;
