import React from 'react';
import { type FC, type PropsWithChildren, useEffect, useRef } from 'react';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';

interface CustomModalProps extends PropsWithChildren {
  onClose: () => void;
}

const CustomModal: FC<CustomModalProps> = ({ onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (dialog) {
        dialog.close();
      }
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="dialog"
      aria-label="form-modal"
      aria-modal={true}
      className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-white/6"
    >
      <div
        onClick={handleBackdropClick}
        className="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center backdrop-blur-sm"
      >
        <div
          className="z-50 rounded-xl border border-black bg-white p-4"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
          <CustomButton text="close" onClick={onClose} />
        </div>
      </div>
    </dialog>
  );
};

export default CustomModal;
