declare type CustomSelectOption = { name: string; value: string };
declare type FormDataDisplay = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
  termsAndConditions: boolean | null;
  images: string | string[] | null;
  country: string;
  lastModified: string;
};

declare type FieldControlType = 'input' | 'autocompleteSelect' | 'select';

declare interface FieldConfig {
  controlType: FieldControlType;
  label: string;
  name: string;
  id: string;
  options?: CustomSelectOption[];
  type?: string;
  props?: Record<string, unknown>;
}

declare interface ActionConfig {
  type: 'submit';
  text: string;
  props?: Record<string, unknown>;
}
