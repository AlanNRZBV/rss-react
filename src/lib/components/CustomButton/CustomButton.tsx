'use client';
import React, { FC } from 'react';
import clsx from 'clsx';
import { useTheme } from '@/lib/hooks/useTheme.ts';

interface Props {
  onClick?: () => void;
  text: string;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  isLoading?: boolean;
}

const CustomButton: FC<Props> = ({
  text,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled,
  isLoading,
  ...props
}) => {
  const theme = useTheme();
  const isDark = theme === 'dark';
  const baseClasses =
    'rounded-md text-base font-medium cursor-pointer uppercase border px-4 py-2 flex gap-2 items-center';
  const variantClasses = {
    primary: 'bg-white dark:text-black',
    secondary: 'dark:border-gray-400 dark:text-gray-400',
  };
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(baseClasses, variantClasses[variant])}
      {...props}
    >
      {isLoading && (
        <div>
          <svg
            className="mr-3 -ml-1 size-5 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke={isDark ? 'white' : 'black'}
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="black"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}

      <span>{text}</span>
    </button>
  );
};

export default CustomButton;
