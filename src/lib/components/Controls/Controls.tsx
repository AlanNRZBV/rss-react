import { useMemo, useState } from 'react';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';
import { createPortal } from 'react-dom';
import CustomModal from '../CustomModal/CustomModal.tsx';
import ControlledForm from '@/lib/components/Forms/ControlledForm.tsx';
import UncontrolledForm from '@/lib/components/Forms/UncontrolledForm.tsx';

const Controls = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<
    'controlled' | 'uncontrolled' | null
  >(null);

  const modalRoot = useMemo(() => document.getElementById('modal-root'), []);

  const handleControlledClick = () => {
    setShowModal((prevState) => !prevState);
    setModalType('controlled');
  };

  const handleUncontrolledClick = () => {
    setShowModal((prevState) => !prevState);
    setModalType('uncontrolled');
  };

  const handleClose = () => {
    setShowModal((prevState) => !prevState);
    setModalType(null);
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <CustomButton onClick={handleControlledClick} text="controlled" />
      <CustomButton onClick={handleUncontrolledClick} text="uncontrolled" />
      {showModal &&
        modalRoot &&
        createPortal(
          <CustomModal onClose={handleClose}>
            {modalType === 'controlled' ? (
              <ControlledForm onSuccess={handleClose} />
            ) : (
              <UncontrolledForm onSuccess={handleClose} />
            )}
          </CustomModal>,
          modalRoot
        )}
    </div>
  );
};

export default Controls;
