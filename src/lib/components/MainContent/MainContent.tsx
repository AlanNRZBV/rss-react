import { useMemo, useState } from 'react';
import CustomButton from '../CustomButton/CustomButton.tsx';
import { createPortal } from 'react-dom';
import CustomModal from '../CustomModal/CustomModal.tsx';

const MainContent = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

  const handleClick = () => {
    setShowModal((prevState) => !prevState);
  };
  return (
    <div className="flex h-1/4 basis-1/4 items-center justify-center gap-4 rounded-md border border-black bg-white p-4">
      <CustomButton onClick={handleClick} text="controlled" />
      <CustomButton onClick={handleClick} text="uncontrolled" />
      {showModal &&
        modalRoot &&
        createPortal(<CustomModal onClose={handleClick} />, modalRoot)}
    </div>
  );
};

export default MainContent;
