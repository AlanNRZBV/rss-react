import { getNow } from '@/lib/utils/getNow.ts';

export const transformFileFormat = async (arg: FormInputs) => {
  const file = arg.images as File | null;

  if (!file) {
    return { ...arg, images: null };
  }

  const base64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const date = getNow();

  return { ...arg, images: base64, lastModified: date };
};
