import { Suspense } from 'react';
import Column from '../lib/components/Column/Column.tsx';
import CountryList from '../lib/components/CountryList/CountryList.tsx';
import DataTable from '@/lib/components/DataTable/DataTable.tsx';

const App = () => {
  return (
    <div className="p-4 w-full grid grid-cols-12 gap-4 h-screen">
      <Column className="col-span-5">
        <Suspense fallback={<div>Loading...</div>}>
          <CountryList />
        </Suspense>
      </Column>
      <Column className="col-span-7">
        <DataTable />
      </Column>
    </div>
  );
};
export default App;
