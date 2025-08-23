declare type CustomSelectOption = { name: string; value: string };
declare type FormDataDisplay = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  age: number;
  termsAndConditions: boolean;
  images: string | string[] | null;
  country: string;
  lastModified: string;
};

declare type UserInputData = Omit<FormDataDisplay, 'images'> & {
  images: File | File[] | null;
};
