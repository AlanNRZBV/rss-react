import Controls from '@/lib/components/Controls/Controls.tsx';
import Column from '@/lib/components/Column/Column.tsx';
import { useSelector } from 'react-redux';
import {
  selectControlledState,
  selectUncontrolledState,
} from '@/lib/features/App/appSlice.ts';
import DataDisplay from '@/lib/components/DataDisplay/DataDisplay.tsx';

const App = () => {
  const uncontrolledState = useSelector(selectUncontrolledState);
  const controlledState = useSelector(selectControlledState);
  return (
    <div className="grid h-full grid-cols-2 grid-rows-12 gap-4 bg-gray-500 p-4">
      <Column className="col-span-2 row-span-2 content-center">
        <Controls />
      </Column>
      <Column className="row-span-10">
        <DataDisplay data={controlledState} />
      </Column>
      <Column className="row-span-10">
        <DataDisplay data={uncontrolledState} />
      </Column>
    </div>
  );
};
export default App;
