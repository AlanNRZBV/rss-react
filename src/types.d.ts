declare type CustomSelectOption = { name: string; value: string };
declare type FormDataDisplay = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
  tAndC: boolean;
  images: File | FileList | null;
  country: string;
  lastModified: string | null;
};
