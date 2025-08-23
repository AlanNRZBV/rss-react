import { type FC } from 'react';
interface DataDisplayProps {
  data: FormDataDisplay;
}

type FieldConfigItem<K extends keyof FormDataDisplay> = {
  key: K;
  label: string;
  format?: (arg: FormDataDisplay[K]) => string;
};

const fieldConfig: FieldConfigItem<keyof FormDataDisplay>[] = [
  { key: 'name', label: 'name' },
  { key: 'email', label: 'email' },
  { key: 'age', label: 'age' },
  { key: 'password', label: 'password' },
  { key: 'confirmPassword', label: 'confirm password' },
  { key: 'gender', label: 'gender' },
  { key: 'country', label: 'country' },
  { key: 'images', label: 'images' },
  {
    key: 'termsAndConditions',
    label: 'terms and conditions',
    format: (arg) => (arg ? 'accepted' : 'not accepted'),
  },
  {
    key: 'lastModified',
    label: 'last modified',
    format: (arg) => (arg ? String(arg) : 'never'),
  },
] as const;

const DataDisplay: FC<DataDisplayProps> = ({ data }) => {
  return (
    <ul>
      {fieldConfig.map(({ key, label, format }) => (
        <li key={key}>
          {label}: {format ? format(data[key]) : data[key]}
        </li>
      ))}
    </ul>
  );
};

export default DataDisplay;
