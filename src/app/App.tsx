import CustomButton from '../lib/components/CustomButton/CustomButton.tsx';

const App = () => {
  return (
    <div className="flex h-full items-center justify-center bg-gray-50 p-4">
      <div className="flex h-1/4 basis-1/4 items-center justify-center gap-4 rounded-md border border-black bg-white p-4">
        <CustomButton text="controlled" />
        <CustomButton text="uncontrolled" />
      </div>
    </div>
  );
};
export default App;
