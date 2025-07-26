import { usePokemonActions } from '../../shared/hooks/usePokemonActions.ts';
import { useNavigate } from 'react-router';

const DetailedView = () => {
  const navigate = useNavigate();

  const { toggleView } = usePokemonActions();

  const onClickHandler = () => {
    navigate('/');
    toggleView();
  };

  return (
    <div>
      <button
        type="button"
        name="viewToggle"
        className="uppercase"
        onClick={onClickHandler}
      >
        close
      </button>
      content
    </div>
  );
};

export default DetailedView;
