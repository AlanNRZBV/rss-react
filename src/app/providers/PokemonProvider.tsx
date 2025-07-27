import type { AppState } from '../../types';
import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useLocalStorage from '../../shared/hooks/useLocalStorage.ts';
import { fetchDetailed } from '../../shared/api/fetchDetailed.ts';
import { fetchDefaultData } from '../../shared/api/fetchDefaultData.ts';
import { PokemonContext } from '../context/pokemonContext.ts';
import { ActionsContext } from '../context/actionsContext.ts';
import { useNavigate } from 'react-router';
import { fetchPage } from '../../shared/api/fetchPage.ts';
import { fetchExtended } from '../../shared/api/fetchExtended.ts';

const initialState: AppState = {
  search: '',
  defaultSearch: undefined,
  pokemon: undefined,
  error: undefined,
  isLoading: false,
  isError: false,
  pokemonDetailed: undefined,
};

export const PokemonProvider: FC<PropsWithChildren> = ({ children }) => {
  const [app, setApp] = useState<AppState>(initialState);
  const [detailedView, setDetailedView] = useState(false);
  const { dataFromLs, setLocalState } = useLocalStorage();
  const navigate = useNavigate();

  const { search } = app;

  const toggleView = useCallback(() => {
    setDetailedView(!detailedView);
  }, [detailedView]);

  const fetchDetailedHandle = useCallback(async (arg: string) => {
    try {
      setApp((prevState) => ({ ...prevState, isLoading: true }));
      const res = await fetchDetailed(arg);
      setApp((prevState) => ({
        ...prevState,
        isError: 'status' in res,
        error: 'status' in res ? res : undefined,
        isLoading: false,
        pokemonDetailed: 'status' in res ? undefined : res,
      }));
    } catch (e) {
      console.error('Caught on try - fetchExtendedHandle - ', e);
      setApp((prevState) => ({
        ...prevState,
        isLoading: false,
        isError: true,
        error: { status: 0, message: 'Unexpected error' },
      }));
    }
  }, []);

  const changePage = useCallback(
    async (arg: string | null | undefined) => {
      if (!arg) return;

      const url = new URL(arg);
      const { search } = url;
      try {
        setApp((prevState) => ({ ...prevState, isLoading: true }));
        const res = await fetchPage(search);
        setApp((prevState) => ({
          ...prevState,
          defaultSearch: 'status' in res ? undefined : res,
          pokemon: undefined,
          isError: 'status' in res,
          error: 'status' in res ? res : undefined,
          isLoading: false,
        }));
        navigate(`${search}`);
      } catch (e) {
        console.error('Caught on try - changePage - ', e);
        setApp((prevState) => ({
          ...prevState,
          isLoading: false,
          isError: true,
          error: { status: 0, message: 'Unexpected error' },
        }));
      }
    },
    [navigate]
  );

  useEffect(() => {
    let isMounted = true;
    if (!dataFromLs) return;

    const initializeData = async () => {
      try {
        if (dataFromLs) {
          navigate(`/${dataFromLs}`);
          setApp((prevState) => ({
            ...prevState,
            search: dataFromLs,
            isLoading: true,
          }));

          const res = await fetchExtended(dataFromLs);
          if (isMounted && res) {
            setApp((prevState) => ({
              ...prevState,
              defaultSearch: undefined,
              pokemon: 'status' in res ? undefined : res,
              isError: 'status' in res,
              error: 'status' in res ? res : undefined,
              isLoading: false,
            }));
          }
        }
      } catch (e) {
        console.error('Caught on try - initializeData - ', e);
        if (isMounted) {
          setApp((prevState) => ({
            ...prevState,
            isLoading: false,
            isError: true,
            error: { status: 0, message: 'Unexpected error' },
          }));
        }
      }
    };

    initializeData();

    return () => {
      isMounted = false;
    };
  }, [dataFromLs, navigate]);

  useEffect(() => {
    let isMounted = true;

    if (dataFromLs) return;

    const initializeData = async () => {
      try {
        setApp((prevState) => ({ ...prevState, isLoading: true }));
        const res = await fetchDefaultData();
        if (isMounted && res) {
          navigate(`?limit=10&offset=0`);
          setApp((prevState) => ({
            ...prevState,
            defaultSearch: 'status' in res ? undefined : res,
            isError: 'status' in res,
            error: 'status' in res ? res : undefined,
            isLoading: false,
          }));
        }
      } catch (e) {
        console.error('Caught on try - initializeData - ', e);
        if (isMounted) {
          setApp((prevState) => ({
            ...prevState,
            isLoading: false,
            isError: true,
            error: { status: 0, message: 'Unexpected error' },
          }));
        }
      }
    };
    initializeData();

    return () => {
      isMounted = false;
    };
  }, [dataFromLs, navigate]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApp((prevState) => ({
      ...prevState,
      [name]: value.toLowerCase().trim(),
    }));
  }, []);

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!search) {
        setLocalState('');
      }
      try {
        setLocalState(search);

        if (search) {
          setApp((prevState) => ({ ...prevState, isLoading: true }));
          const res = await fetchDetailed(search);
          setApp((prevState) => ({
            ...prevState,
            defaultSearch: undefined,
            pokemon: 'status' in res ? undefined : res,
            isError: 'status' in res,
            error: 'status' in res ? res : undefined,
            isLoading: false,
          }));
          return;
        }
        setApp((prevState) => ({ ...prevState, isLoading: true }));
        const res = await fetchDefaultData();
        setApp((prevState) => ({
          ...prevState,
          defaultSearch: 'status' in res ? undefined : res,
          pokemon: undefined,
          isError: 'status' in res,
          error: 'status' in res ? res : undefined,
          isLoading: false,
        }));
      } catch (e) {
        console.error('Caught on try - onSubmit:', e);
        setApp((prevState) => ({
          ...prevState,
          isLoading: false,
          isError: true,
          error: { status: 0, message: 'Unexpected error' },
        }));
      }
    },
    [search, setLocalState]
  );

  const value = useMemo(() => ({ app, detailedView }), [app, detailedView]);
  const actions = useMemo(
    () => ({
      onChange,
      onSubmit,
      changePage,
      toggleView,
      fetchDetailedHandle,
    }),
    [onChange, onSubmit, toggleView, changePage, fetchDetailedHandle]
  );

  return (
    <PokemonContext.Provider value={value}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </PokemonContext.Provider>
  );
};
