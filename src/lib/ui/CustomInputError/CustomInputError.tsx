import { type FC } from 'react';
interface CustomInputErrorProps {
  isError?: boolean;
  errorText?: string;
}
const CustomInputError: FC<CustomInputErrorProps> = ({
  isError,
  errorText,
}) => {
  return (
    <div className={`h-[18px] ${isError ? 'visible' : 'invisible'}`}>
      <span className="text-xs text-red-400">{errorText}</span>
    </div>
  );
};

export default CustomInputError;
