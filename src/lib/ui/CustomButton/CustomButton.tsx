import type { ButtonHTMLAttributes, FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick?: () => void;
}
const CustomButton: FC<CustomButtonProps> = ({
  text,
  type = 'button',
  onClick,
  disabled,
  className,
  name,
}) => {
  return (
    <button
      className={twMerge(
        'cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-2 text-base font-medium uppercase transition-all duration-150 ease-in-out hover:border-blue-700 hover:bg-blue-500 hover:text-white disabled:pointer-events-none disabled:border-gray-300 disabled:text-gray-300',
        className
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
      name={name}
    >
      {text}
    </button>
  );
};

export default CustomButton;
