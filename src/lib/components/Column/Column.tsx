import { type FC, type HTMLAttributes, type PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

interface ColumnProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

const Column: FC<ColumnProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(
        'rounded-xl border border-black bg-gray-100 p-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Column;
