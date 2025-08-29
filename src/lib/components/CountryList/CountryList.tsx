import CountryListItem from './CountryListItem.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchCountryList } from '@/lib/util/getCountries.ts';

const CountryList = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['countries'],
    queryFn: fetchCountryList,
  });

  console.log(data);

  return (
    <div>
      <h3>Country list</h3>
      <ul>
        <CountryListItem />
      </ul>
    </div>
  );
};

export default CountryList;
