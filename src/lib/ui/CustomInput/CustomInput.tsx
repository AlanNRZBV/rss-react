import { type FC, type InputHTMLAttributes, memo } from 'react';
import CustomInputError from '@/lib/ui/CustomInputError/CustomInputError.tsx';

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorText?: string;
  label: string;
}

const CustomInput: FC<CustomInputProps> = ({
  name,
  type,
  label,
  placeholder,
  isError,
  errorText,
  id,
  checked,
  ...props
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="mb-2 text-lg font-medium capitalize select-none"
      >
        {label}
      </label>
      {type === 'checkbox' ? (
        <div className="flex items-center gap-4 px-2 py-1">
          <input
            checked={checked}
            className="h-[18px] w-[18px] checked:ring-2 checked:ring-blue-500"
            placeholder={placeholder}
            id={id}
            name={name}
            type={type}
            {...props}
          />
          <span className="font-medium">Accept</span>
        </div>
      ) : (
        <div className="transition-color flex rounded-md border border-black bg-gray-100 px-2 py-1 duration-150 focus-within:ring focus-within:ring-blue-500">
          <input
            className="grow outline-0"
            placeholder={placeholder}
            id={id}
            name={name}
            type={type}
            {...props}
          />
        </div>
      )}
      <CustomInputError isError={isError} errorText={errorText} />
    </div>
  );
};

export default memo(CustomInput);
