import CustomInput from '@/lib/ui/CustomInput/CustomInput.tsx';
import CustomAutocompleteSelect from '@/lib/ui/CustomAutocompleteSelect/CustomAutocompleteSelect.tsx';
import CustomSelect from '@/lib/ui/CustomSelect/CustomSelect.tsx';
import CustomButton from '@/lib/ui/CustomButton/CustomButton.tsx';
import { type FC, type FormEvent, useRef, useState } from 'react';
import { useAppDispatch } from '@/lib/providers/store.ts';
import { updateUncontrolledState } from '@/lib/features/App/appSlice.ts';
import { formSchema } from '@/lib/validation/schema.ts';
import { formConfig } from '@/lib/components/Forms/config.ts';
import { getTypedData } from '@/lib/utils/getTypedData.ts';

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

      const typedData = await getTypedData(rawData, formData);

      dispatch(updateUncontrolledState(typedData));
      onSuccess();
    }
  };

  const renderField = (field: FieldConfig) => {
    const commonProps = {
      ...field.props,
      isError: !!formErrors[field.name],
      errorText: formErrors[field.name],
    };

    switch (field.controlType) {
      case 'input':
        return (
          <CustomInput
            key={field.id}
            label={field.label}
            type={field.type}
            name={field.name}
            id={field.id}
            {...commonProps}
          />
        );
      case 'autocompleteSelect':
        return (
          <CustomAutocompleteSelect
            key={field.id}
            label={field.label}
            name={field.name}
            id={field.id}
            options={field.options ? field.options : []}
            {...commonProps}
          />
        );
      case 'select':
        return (
          <CustomSelect
            key={field.id}
            label={field.label}
            name={field.name}
            id={field.id}
            options={field.options ? field.options : []}
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  const renderAction = (action: ActionConfig) => {
    switch (action.type) {
      case 'submit':
        return (
          <CustomButton
            key={action.text}
            text={action.text}
            type="submit"
            {...action.props}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-4 flex h-full flex-col gap-4 border-b border-b-black pb-4">
      <h3 className="text-xl font-bold">Uncontrolled form</h3>
      <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col">
        <div className="grid grid-cols-2 gap-2">
          {formConfig.fields.map(renderField)}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          {formConfig.actions.map(renderAction)}
        </div>
      </form>
    </div>
  );
};

export default UncontrolledForm;
