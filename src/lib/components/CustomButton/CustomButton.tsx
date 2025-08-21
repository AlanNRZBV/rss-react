import type { FC } from 'react';

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
  return (
    <button
      className="flex cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-2 text-base font-medium uppercase transition-all delay-75 ease-in-out hover:border-blue-700 hover:bg-blue-500 hover:text-white"
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

export default CustomButton;
