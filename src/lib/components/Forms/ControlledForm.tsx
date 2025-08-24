import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import CustomInput from '@/lib/ui/CustomInput/CustomInput.tsx';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';
import CustomAutocompleteSelect from '@/lib/ui/CustomAutocompleteSelect/CustomAutocompleteSelect.tsx';
import { COUNTRIES } from '@/lib/static/countries.ts';
import CustomSelect from '@/lib/ui/CustomSelect/CustomSelect.tsx';
import { GENDERS } from '@/lib/static/genders.ts';
import { formSchema } from '@/lib/validation/schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateControlledState } from '@/lib/features/App/appSlice.ts';
import type { FC } from 'react';
import { useAppDispatch } from '@/lib/providers/store.ts';
import { transformFileFormat } from '@/lib/utils/transformFileFormat.ts';

interface ControlledFormProps {
  onSuccess: () => void;
}

const ControlledForm: FC<ControlledFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      age: 0,
      termsAndConditions: false,
      images: undefined,
      country: '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data: FormInputs) => {
    console.log('data', data);
    console.log('isavlid', isValid);
    console.log('fs', errors);
    try {
      if (isValid && !isSubmitting) {
        const transformedData = await transformFileFormat(data);

        dispatch(updateControlledState(transformedData));
        onSuccess();
      }
    } catch (e) {
      console.error('Caught on try - Submit controlled form ', e);
    }
  };

  return (
    <div className="mb-4 flex h-full flex-col gap-4 border-b border-b-black pb-4">
      <h3 className="text-xl font-bold">Controlled form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <div className="grid grid-cols-2 gap-2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <CustomInput
                label="name"
                type="text"
                placeholder="Enter your name"
                id="name"
                {...field}
                isError={!!errors.name}
                errorText={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <CustomInput
                label="email"
                type="email"
                id="email"
                placeholder="Enter your email"
                {...field}
                isError={!!errors.email}
                errorText={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="age"
            render={({ field }) => (
              <CustomInput
                label="age"
                type="number"
                id="age"
                placeholder="Enter your age"
                {...field}
                value={field.value != null ? String(field.value) : ''}
                isError={!!errors.age}
                errorText={errors.age?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <CustomInput
                label="password"
                type="password"
                id="password"
                placeholder="Enter your password"
                {...field}
                isError={!!errors.password}
                errorText={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field }) => (
              <CustomInput
                label="confirm password"
                type="password"
                id="confirm-password"
                placeholder="Confirm your password"
                {...field}
                isError={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <CustomInput
                label="images"
                type="file"
                id="images"
                placeholder="Upload your images"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) =>
                  field.onChange(e.target.files ? e.target.files[0] : [])
                }
                onBlur={field.onBlur}
                isError={!!errors.images}
                errorText={errors.images?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="country"
            render={({ field }) => (
              <CustomAutocompleteSelect
                label="Select country"
                id="country"
                placeholder="Select country"
                autoComplete="on"
                options={COUNTRIES}
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value ?? ''}
                name={field.name}
                isError={!!errors.country}
                errorText={errors.country?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <CustomSelect
                label="gender"
                id="gender"
                options={GENDERS}
                {...field}
                isError={!!errors.gender}
                errorText={errors.gender?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="termsAndConditions"
            render={({ field }) => (
              <CustomInput
                label="terms and conditions"
                type="checkbox"
                id="terms-and-conditions"
                placeholder="Confirm your password"
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
                name={field.name}
                isError={!!errors.termsAndConditions}
                errorText={errors.termsAndConditions?.message}
              />
            )}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <CustomButton
            text="submit"
            type="submit"
            disabled={!isValid || isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default ControlledForm;
