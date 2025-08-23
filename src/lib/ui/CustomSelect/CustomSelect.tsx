import { type FC, type SelectHTMLAttributes } from 'react';

interface CustomSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: CustomSelectOption[];
  isError?: boolean;
  errorText?: string;
}

const CustomSelect: FC<CustomSelectProps> = ({
  name,
  label,
  id,
  options,
  isError,
  errorText,
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="mb-2 text-lg font-medium capitalize select-none"
      >
        {label}
      </label>
      <div className="transition-color flex rounded-md border border-black bg-gray-100 px-2 py-1 duration-150 focus-within:ring focus-within:ring-blue-500">
        <select name={name} id={id} className="min-h-[24px] grow outline-0">
          {options.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      <div className={`${isError ? 'visible' : 'invisible'}`}>
        <span className="text-sm text-red-400">{errorText}</span>
      </div>
    </div>
  );
};

export default CustomSelect;
