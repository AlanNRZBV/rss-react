import type { FC } from 'react';
import CustomButton from '../CustomButton/CustomButton.tsx';

interface CustomModalProps {
  onClose: () => void;
}
const CustomModal: FC<CustomModalProps> = ({ onClose }) => {
  return (
    <dialog
      id="dialog"
      aria-label="form-modal"
      aria-modal={true}
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm"
    >
      <div>
        content
        <CustomButton text="close" onClick={onClose} />
      </div>
    </dialog>
  );
};

export default CustomModal;
