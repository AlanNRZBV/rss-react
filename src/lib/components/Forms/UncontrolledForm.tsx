import CustomInput from '@/lib/ui/CustomInput/CustomInput.tsx';
import CustomAutocompleteSelect from '@/lib/ui/CustomAutocompleteSelect/CustomAutocompleteSelect.tsx';
import { COUNTRIES } from '@/lib/static/countries.ts';
import CustomSelect from '@/lib/ui/CustomSelect/CustomSelect.tsx';
import { GENDERS } from '@/lib/static/genders.ts';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';
import { type FC, type FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '@/lib/providers/store.ts';
import { updateUncontrolledState } from '@/lib/features/App/appSlice.ts';
import { getNow } from '@/lib/utils/getNow.ts';
import { formSchema } from '@/lib/validation/schema.ts';

interface UncontrolledFormProps {
  onSuccess: () => void;
}

const UncontrolledForm: FC<UncontrolledFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = useState<{
    [key: string]: string | undefined;
  }>({});
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const rawData = Object.fromEntries(formData.entries());
      const result = await formSchema.safeParseAsync(rawData);

      if (!result.success) {
        const errorMap: { [key: string]: string } = {};
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          errorMap[field] = issue.message;
        });
        setFormErrors(errorMap);
        return;
      }

      const typedData: FormDataDisplay = {
        name: (rawData.name as string) || '',
        email: (rawData.email as string) || '',
        password: (rawData.password as string) || '',
        confirmPassword: (rawData.confirmPassword as string) || '',
        gender: (rawData.gender as string) || '',
        age: Number(rawData.age) || 0,
        termsAndConditions: !!rawData.termsAndConditions,
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
      onSuccess();
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
            isError={!!formErrors.name}
            errorText={formErrors.name}
          />
          <CustomInput
            label="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            id="email"
            isError={!!formErrors.email}
            errorText={formErrors.email}
          />
          <CustomInput
            type="number"
            label="age"
            name="age"
            placeholder="Enter your age"
            id="age"
            isError={!!formErrors.age}
            errorText={formErrors.age}
          />
          <CustomInput
            type="password"
            label="password"
            name="password"
            placeholder="Enter your password"
            id="password"
            isError={!!formErrors.password}
            errorText={formErrors.password}
          />
          <CustomInput
            type="password"
            label="confirm password"
            id="confirm-password"
            name="confirmPassword"
            placeholder="Enter your name"
            isError={!!formErrors.confirmPassword}
            errorText={formErrors.confirmPassword}
          />
          <CustomInput
            type="checkbox"
            label="terms and conditions"
            id="tems-and-conditions"
            name="termsAndConditions"
            placeholder="Enter your name"
            isError={!!formErrors.tAndC}
            errorText={formErrors.tAndC}
          />
          <CustomInput
            type="file"
            label="images"
            id="images"
            name="images"
            placeholder="Upload your images"
            accept="image/png, image/jpeg, image/jpg"
            isError={!!formErrors.images}
            errorText={formErrors.images}
          />
          <CustomAutocompleteSelect
            label="Select country"
            name="country"
            id="country"
            options={COUNTRIES}
            autoComplete="on"
            placeholder="Select country"
            isError={!!formErrors.country}
            errorText={formErrors.country}
          />
          <CustomSelect
            label="gender"
            name="gender"
            id="gender"
            options={GENDERS}
            isError={!!formErrors.gender}
            errorText={formErrors.gender}
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
