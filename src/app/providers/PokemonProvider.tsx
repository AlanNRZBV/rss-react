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
import { fetchExtendedData } from '../../shared/helpers/fetchExtendedData.ts';
import { fetchDefaultData } from '../../shared/helpers/fetchDefaultData.ts';
import { PokemonContext } from '../context/pokemonContext.ts';
import { ActionsContext } from '../context/actionsContext.ts';

const initialState: AppState = {
  search: '',
  defaultSearch: undefined,
  pokemon: undefined,
  error: undefined,
  isLoading: false,
  isError: false,
};

export const PokemonProvider: FC<PropsWithChildren> = ({ children }) => {
  const [app, setApp] = useState<AppState>(initialState);
  const [detailedView, setDetailedView] = useState(false);
  const { dataFromLs, setLocalState } = useLocalStorage();

  const { search } = app;

  const toggleView = () => {
    setDetailedView(!detailedView);
  };

  useEffect(() => {
    let isMounted = true;

    if (!dataFromLs) return;

    const initializeData = async () => {
      try {
        if (dataFromLs) {
          setApp((prevState) => ({
            ...prevState,
            search: dataFromLs,
            isLoading: true,
          }));

          const result = await fetchExtendedData(dataFromLs);
          if (isMounted) {
            setApp((prevState) => ({
              ...prevState,
              pokemon: 'status' in result ? undefined : result,
              isError: 'status' in result,
              error: 'status' in result ? result : undefined,
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
  }, [dataFromLs]);

  useEffect(() => {
    let isMounted = true;

    if (dataFromLs) return;

    const initializeData = async () => {
      try {
        const res = await fetchDefaultData();
        if (isMounted) {
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
  }, [dataFromLs]);

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
        setApp((prevState) => ({ ...prevState, isLoading: true }));
        const result = await fetchExtendedData(search);
        setApp((prevState) => ({
          ...prevState,
          defaultSearch: undefined,
          pokemon: 'status' in result ? undefined : result,
          isError: 'status' in result,
          error: 'status' in result ? result : undefined,
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
    () => ({ onChange, onSubmit, toggleView }),
    [onChange, onSubmit, toggleView]
  );

  return (
    <PokemonContext.Provider value={value}>
      <ActionsContext.Provider value={actions}>
        {children}
      </ActionsContext.Provider>
    </PokemonContext.Provider>
  );
};
