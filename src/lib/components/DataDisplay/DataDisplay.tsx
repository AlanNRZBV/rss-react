import { type FC, useEffect, useState } from 'react';
import { fieldConfig } from '@/lib/components/Forms/config.ts';
import { isRecently } from '@/lib/utils/isRecently.ts';

interface DataDisplayProps {
  data: FormDataDisplay;
}

const NEW_TIMEOUT = 60_000;

const DataDisplay: FC<DataDisplayProps> = ({ data }) => {
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    if (!isRecently(data.lastModified)) {
      setIsNew(false);
      return;
    }

    setIsNew(true);
    const to = setTimeout(() => setIsNew(false), NEW_TIMEOUT);

    return () => clearTimeout(to);
  }, [data.lastModified]);

  return (
    <ul className="grid grid-cols-2 rounded-lg border-2 bg-white p-2">
      {isNew && (
        <li className="col-span-2 mb-2 flex items-center justify-center gap-1 rounded bg-green-100 px-2 py-1 text-sm font-bold text-green-700">
          New Data!
        </li>
      )}
      {fieldConfig.map(({ key, label, format }) => (
        <li key={key} className="mb-2 flex flex-col gap-2">
          <span className="font-medium capitalize">{label}:</span>
          <span className="truncate pb-2 text-pretty">
            {format ? format(data[key]) : data[key]}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default DataDisplay;
