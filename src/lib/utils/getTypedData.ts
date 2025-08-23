import { getNow } from '@/lib/utils/getNow.ts';

export const getTypedData = async (
  arg: { [k: string]: FormDataEntryValue },
  fd: FormData
) => {
  const typedData: FormDataDisplay = {
    name: (arg.name as string) || '',
    email: (arg.email as string) || '',
    password: (arg.password as string) || '',
    confirmPassword: (arg.confirmPassword as string) || '',
    gender: (arg.gender as string) || '',
    age: Number(arg.age) || 0,
    termsAndConditions: !!arg.termsAndConditions,
    country: (arg.country as string) || '',
    lastModified: getNow(),
    images: null,
  };

  const file = fd.get('images') as File | null;
  if (file) {
    try {
      typedData.images = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Convert error', error);
    }
  }

  return typedData;
};
