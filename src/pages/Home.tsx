import SearchBar from '../features/SearchBar/SearchBar.tsx';
import PokemonsList from '../features/PokemonsList/PokemonsList.tsx';
import { useAppDispatch, useAppSelector } from '../app/providers/store.ts';
import { selectDetailedView, toggleView } from '../app/appSlice.ts';
import { Outlet, useNavigate, useParams, useSearchParams } from 'react-router';
import { useEffect } from 'react';

const Home = () => {
  const detailedView = useAppSelector(selectDetailedView);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const isEmpty = params.name?.trim().length === 0;

    if (params.name && !isEmpty) {
      dispatch(toggleView('open'));
    }
    return;
  }, [dispatch, params.name]);

  useEffect(() => {
    if (!detailedView && params.name) {
      const queryString = searchParams.toString()
        ? `?${searchParams.toString()}`
        : '';
      navigate(`/${queryString}`, { replace: true });
    }
  }, [detailedView, params.name, navigate, searchParams]);

  return (
    <div className="flex h-full w-full">
      <div className="grow">
        <SearchBar />
        <PokemonsList />
      </div>
      <div
        className={`overflow-hidden transition-all delay-100 duration-200 ${detailedView ? 'ml-4 basis-1/2 opacity-100' : 'ml-0 basis-0 opacity-0'}`}
      >
        <div
          className={`transition-all duration-200 ${
            detailedView ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
