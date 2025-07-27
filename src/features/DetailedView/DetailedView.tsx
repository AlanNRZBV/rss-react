import { usePokemonActions } from '../../shared/hooks/usePokemonActions.ts';
import { useNavigate } from 'react-router';
import { usePokemon } from '../../shared/hooks/usePokemon.ts';

const DetailedView = () => {
  const navigate = useNavigate();
  const { app } = usePokemon();
  console.log(app);
  const { error, isError, isLoading, pokemonDetailed } = app;
  const { toggleView } = usePokemonActions();

  const onClickHandler = () => {
    navigate(-1);
    toggleView();
  };

  if (!pokemonDetailed) {
    return (
      <div>
        <div>
          <button
            type="button"
            name="viewToggle"
            className="uppercase"
            onClick={onClickHandler}
          >
            close
          </button>
        </div>
        No data to render
      </div>
    );
  }

  const { height, id, order, weight, name, base_experience, is_default } =
    pokemonDetailed;

  if (isError && error) {
    const { message, status } = error;

    if (status === 404) {
      return <div>Wrong pokemon name</div>;
    }

    return (
      <div>
        Something bad happen. Try to reload page
        <div className="flex flex-col">
          <span>Error status : {status}</span>
          <span>Error message : {message}</span>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return <div>Loading content</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="mb-2 grow border-b border-b-gray-400 pb-2">
        <button
          type="button"
          name="viewToggle"
          className="rounded-md border border-gray-400 px-4 py-2 uppercase"
          onClick={onClickHandler}
        >
          close
        </button>
      </div>
      <div>
        <p>
          <b className="font-bold capitalize">{name}</b> detailed data
        </p>
        <ul>
          <li>Id: {id}</li>
          <li>Name: {name}</li>
          <li>Exp: {base_experience}</li>
          <li>Heigh: {height}</li>
          <li>Order: {order}</li>
          <li>Weight: {weight}</li>
          <li>Default: {is_default ? 'yes' : 'no'}</li>
        </ul>
      </div>
    </div>
  );
};

export default DetailedView;
