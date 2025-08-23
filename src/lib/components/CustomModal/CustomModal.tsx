import type { FC, PropsWithChildren } from 'react';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';

interface CustomModalProps extends PropsWithChildren {
  onClose: () => void;
}
const CustomModal: FC<CustomModalProps> = ({ onClose, children }) => {
  return (
    <dialog
      onClick={onClose}
      id="dialog"
      aria-label="form-modal"
      aria-modal={true}
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-white/30 backdrop-blur-sm"
    >
      <div className="rounded-xl border border-black bg-white p-4">
        {children}
        <CustomButton text="close" onClick={onClose} />
      </div>
    </dialog>
  );
};

export default CustomModal;
