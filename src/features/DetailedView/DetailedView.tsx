import { useGetDetailedPokemonByNameQuery } from '../../shared/api/pokemonApi.ts';
import { useParams } from 'react-router';
import { skipToken } from '@reduxjs/toolkit/query';
import { useAppDispatch } from '../../app/providers/store.ts';
import { toggleView } from '../../app/appSlice.ts';

const DetailedView = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const { data, isFetching, isLoading, isError, error } =
    useGetDetailedPokemonByNameQuery(params.name ?? skipToken);

  const onClickHandler = () => {
    dispatch(toggleView('close'));
  };

  if (isLoading || isFetching) {
    return <div>Loading content</div>;
  }

  if (!data) {
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

  const { height, id, order, weight, name, base_experience, is_default } = data;

  if (isError) {
    if ('originalStatus' in error && error.originalStatus === 404) {
      return <div>Wrong pokemon name</div>;
    }

    return (
      <div>
        Something bad happen. Try to reload page
        <div className="flex flex-col">
          <span>Error status : </span>
          <span>Error message : </span>
        </div>
      </div>
    );
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
