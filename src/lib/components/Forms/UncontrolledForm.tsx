import CustomInput from '@/lib/ui/CustomInput/CustomInput.tsx';
import CustomAutocompleteSelect from '@/lib/ui/CustomAutocompleteSelect/CustomAutocompleteSelect.tsx';
import { COUNTRIES } from '@/lib/static/countries.ts';
import CustomSelect from '@/lib/ui/CustomSelect/CustomSelect.tsx';
import { GENDERS } from '@/lib/static/genders.ts';

const UncontrolledForm = () => {
  return (
    <div className="flex h-full flex-col gap-4">
      <h3 className="text-xl font-bold">Uncontrolled form</h3>
      <form className="grid grid-cols-2 gap-2">
        <CustomInput
          label="name"
          type="text"
          name="name"
          placeholder="Enter your name"
          id="name"
          readOnly
        />
        <CustomInput
          label="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          id="email"
          readOnly
        />
        <CustomInput
          type="number"
          label="age"
          name="age"
          placeholder="Enter your age"
          id="age"
          readOnly
        />
        <CustomInput
          type="password"
          label="password"
          name="password"
          placeholder="Enter your password"
          id="password"
          readOnly
        />
        <CustomInput
          type="password"
          label="confirm password"
          id="confirm-password"
          name="confirmPassword"
          placeholder="Enter your name"
          readOnly
        />
        <CustomInput
          type="checkbox"
          label="terms and conditions"
          id="tems-and-conditions"
          name="termsAndConditions"
          placeholder="Enter your name"
          readOnly
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
      </form>
      <div className="mt-auto mb-2 flex items-center justify-center gap-2">
        <span>last modified</span>
        <span>time here</span>
      </div>
    </div>
  );
};

export default UncontrolledForm;
