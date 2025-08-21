import Controls from '@/lib/components/Controls/Controls.tsx';
import Content from '@/lib/components/Content/Content.tsx';
import Column from '@/lib/components/Column/Column.tsx';

const App = () => {
  return (
    <div className="grid h-full grid-cols-2 gap-4 bg-gray-500 p-4">
      <Column>
        <Controls />
      </Column>
      <Column>
        <Content />
      </Column>
    </div>
  );
};
export default App;
