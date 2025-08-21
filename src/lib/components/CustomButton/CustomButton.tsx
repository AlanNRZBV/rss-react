import type { FC } from 'react';
import clsx from 'clsx';

interface CustomButtonProps {
  text: string;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}
const CustomButton: FC<CustomButtonProps> = ({
  text,
  type = 'button',
  onClick,
  disabled,
}) => {
  const baseClasses =
    'rounded-md text-base font-medium cursor-pointer uppercase border px-4 py-2 flex gap-2 items-center';
  return (
    <button
      className={clsx(baseClasses)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default CustomButton;
