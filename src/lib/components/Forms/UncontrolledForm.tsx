import CustomInput from '@/lib/ui/CustomInput/CustomInput.tsx';
import CustomAutocompleteSelect from '@/lib/ui/CustomAutocompleteSelect/CustomAutocompleteSelect.tsx';
import { COUNTRIES } from '@/lib/static/countries.ts';
import CustomSelect from '@/lib/ui/CustomSelect/CustomSelect.tsx';
import { GENDERS } from '@/lib/static/genders.ts';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';
import { type FormEvent, useRef } from 'react';
import { useAppDispatch } from '@/lib/providers/store.ts';
import { updateUncontrolledState } from '@/lib/features/App/appSlice.ts';
import { getNow } from '@/lib/utils/getNow.ts';

const UncontrolledForm = () => {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const rawData = Object.fromEntries(formData.entries());
      const typedData: FormDataDisplay = {
        name: (rawData.name as string) || '',
        email: (rawData.email as string) || '',
        password: (rawData.password as string) || '',
        confirmPassword: (rawData.confirmPassword as string) || '',
        gender: (rawData.gender as string) || '',
        age: Number(rawData.age) || 0,
        tAndC: !!rawData.tAndC,
        country: (rawData.country as string) || '',
        lastModified: getNow(),
        images: null,
      };

      const file = formData.get('images') as File | null;
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
      dispatch(updateUncontrolledState(typedData));
    }
  };

  return (
    <div className="mb-4 flex h-full flex-col gap-4 border-b border-b-black pb-4">
      <h3 className="text-xl font-bold">Uncontrolled form</h3>
      <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col">
        <div className="grid grid-cols-2 gap-2">
          <CustomInput
            label="name"
            type="text"
            name="name"
            placeholder="Enter your name"
            id="name"
          />
          <CustomInput
            label="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            id="email"
          />
          <CustomInput
            type="number"
            label="age"
            name="age"
            placeholder="Enter your age"
            id="age"
          />
          <CustomInput
            type="password"
            label="password"
            name="password"
            placeholder="Enter your password"
            id="password"
          />
          <CustomInput
            type="password"
            label="confirm password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Enter your name"
          />
          <CustomInput
            type="checkbox"
            label="terms and conditions"
            id="tems-and-conditions"
            name="termsAndConditions"
            placeholder="Enter your name"
          />
          <CustomInput
            type="file"
            label="images"
            id="images"
            name="images"
            placeholder="Upload your images"
            accept="image/png, image/jpeg, image/jpg"
          />
          <CustomAutocompleteSelect
            label="Select country"
            name="country"
            id="country"
            options={COUNTRIES}
            autoComplete="on"
            placeholder="Select country"
          />
          <CustomSelect
            label="gender"
            name="gender"
            id="gender"
            options={GENDERS}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <CustomButton text="submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default UncontrolledForm;
