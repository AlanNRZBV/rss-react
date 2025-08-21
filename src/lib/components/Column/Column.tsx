import { type FC, type PropsWithChildren } from 'react';
const Column: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="rounded-xl border border-black bg-gray-100 p-4">
      {children}
    </div>
  );
};

export default Column;
