import { Suspense, useMemo, useState } from 'react';
import Column from '../lib/components/Column/Column.tsx';
import CountryList from '../lib/components/CountryList/CountryList.tsx';
import DataTable from '@/lib/components/DataTable/DataTable.tsx';
import CustomModal from '@/lib/components/CustomModal/CustomModal.tsx';
import { createPortal } from 'react-dom';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';
import Controls from '@/lib/components/Controls/Controls.tsx';

const App = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const modalRoot = useMemo(() => document.getElementById('modal-root'), []);
  const handleClose = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleClick = () => {
    setShowModal(true);
  };
  return (
    <div className="p-4 w-full grid grid-cols-12 gap-4 h-screen">
      <Column className="col-span-5">
        <Suspense fallback={<div>Loading...</div>}>
          <CountryList />
        </Suspense>
      </Column>
      <Column className="col-span-7">
        <div>
          <CustomButton onClick={handleClick} text="columns" />
        </div>
        <DataTable />
      </Column>
      {showModal &&
        modalRoot &&
        createPortal(
          <CustomModal onClose={handleClose}>
            <Controls />
          </CustomModal>,
          modalRoot
        )}
    </div>
  );
};
export default App;
