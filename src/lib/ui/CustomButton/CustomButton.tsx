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
        "'flex hover:text-white' cursor-pointer items-center gap-2 rounded-lg border bg-white px-4 py-2 text-base font-medium uppercase transition-all delay-75 ease-in-out hover:border-blue-700 hover:bg-blue-500",
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
