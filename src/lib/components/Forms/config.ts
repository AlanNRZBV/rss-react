import { COUNTRIES } from '@/lib/static/countries.ts';
import { GENDERS } from '@/lib/static/genders.ts';

interface FormConfig {
  fields: FieldConfig[];
  actions: ActionConfig[];
}

type FieldConfigItem<K extends keyof FormDataDisplay> = {
  key: K;
  label: string;
  format?: (arg: FormDataDisplay[K]) => string;
};

export const formConfig: FormConfig = {
  fields: [
    {
      controlType: 'input',
      label: 'name',
      name: 'name',
      id: 'name',
      type: 'text',
      props: { placeholder: 'Enter your name' },
    },
    {
      controlType: 'input',
      label: 'email',
      name: 'email',
      id: 'email',
      type: 'email',
      props: { placeholder: 'Enter your email' },
    },
    {
      controlType: 'input',
      label: 'age',
      name: 'age',
      id: 'age',
      type: 'number',
      props: { placeholder: 'Enter your age' },
    },
    {
      controlType: 'input',
      label: 'password',
      name: 'password',
      id: 'password',
      type: 'password',
      props: { placeholder: 'Enter your password' },
    },
    {
      controlType: 'input',
      label: 'confirm password',
      name: 'confirmPassword',
      id: 'confirm-password',
      type: 'password',
      props: { placeholder: 'Confirm your password' },
    },

    {
      controlType: 'input',
      label: 'images',
      name: 'images',
      id: 'images',
      type: 'file',
      props: {
        placeholder: 'Upload your images',
        accept: 'image/png, image/jpeg, image/jpg',
      },
    },
    {
      controlType: 'autocompleteSelect',
      label: 'Select country',
      name: 'country',
      id: 'country',
      options: COUNTRIES,
      props: {
        autoComplete: 'on',
        placeholder: 'Select country',
      },
    },
    {
      controlType: 'select',
      label: 'gender',
      name: 'gender',
      id: 'gender',
      options: GENDERS,
      props: {},
    },
    {
      controlType: 'input',
      label: 'terms and conditions',
      name: 'termsAndConditions',
      id: 'terms-and-conditions',
      type: 'checkbox',
      props: {},
    },
  ],
  actions: [
    {
      type: 'submit',
      text: 'submit',
      props: {},
    },
  ],
};

export const fieldConfig: FieldConfigItem<keyof FormDataDisplay>[] = [
  { key: 'name', label: 'name' },
  { key: 'email', label: 'email' },
  { key: 'age', label: 'age', format: (arg) => (arg === 0 ? '' : String(arg)) },
  { key: 'password', label: 'password' },
  { key: 'confirmPassword', label: 'confirm password' },
  { key: 'gender', label: 'gender' },
  { key: 'country', label: 'country' },
  { key: 'images', label: 'images' },
  {
    key: 'termsAndConditions',
    label: 'terms and conditions',
    format: (arg) =>
      arg !== null ? (arg ? 'accepted' : 'not accepted') : String(''),
  },
  {
    key: 'lastModified',
    label: 'last modified',
    format: (arg) => (arg ? String(arg) : 'Has not been modified yet'),
  },
] as const;
