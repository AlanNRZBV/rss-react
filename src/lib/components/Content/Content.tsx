import ControlledForm from '@/lib/components/Forms/ControlledForm.tsx';
import UncontrolledForm from '@/lib/components/Forms/UncontrolledForm.tsx';

const Content = () => {
  return (
    <div className="h-full">
      <ControlledForm />
      <UncontrolledForm />
    </div>
  );
};

export default Content;
