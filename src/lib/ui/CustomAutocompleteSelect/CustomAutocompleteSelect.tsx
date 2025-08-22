import { type FC, type InputHTMLAttributes } from 'react';
interface CustomAutocompleteSelectProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  options: CustomSelectOption[];
  placeholder?: string;
  autoComplete?: string;
}

const CustomAutocompleteSelect: FC<CustomAutocompleteSelectProps> = ({
  name,
  label,
  id,
  options,
  autoComplete,
  placeholder,
  type,
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
        <input
          autoComplete={autoComplete}
          placeholder={placeholder}
          id={id}
          name={name}
          type={type}
          className="grow outline-0"
          list="countries"
        />
        <datalist id="countries">
          {options.map((item, index) => (
            <option key={index} value={item.name} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export default CustomAutocompleteSelect;
