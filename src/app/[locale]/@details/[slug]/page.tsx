'use client';
import { skipToken } from '@reduxjs/toolkit/query';
import { notFound, useParams } from 'next/navigation';
import { useGetDetailedPokemonByNameQuery } from '@/lib/api/pokemonApi.ts';
import { redirect } from '@/i18n/navigation.ts';
import { useLocale } from 'next-intl';
import {
  selectDetailedView,
  toggleView,
} from '@/lib/features/DetailedView/detailedViewSlice.ts';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.ts';

const DetailedView = () => {
  const params = useParams();
  const currentLocale = useLocale();
  const dispatch = useAppDispatch();
  const detailedView = useAppSelector(selectDetailedView);

  const { data, isFetching, isLoading, isError, error } =
    useGetDetailedPokemonByNameQuery((params.slug as string) ?? skipToken);
  if (!detailedView) {
    return null;
  }

  if (!params.slug) {
    notFound();
  }

  const onClickHandler = () => {
    dispatch(toggleView('close'));
    redirect({ href: '/', locale: currentLocale });
  };

  if (isLoading || isFetching) {
    return <div className="dark:text-gray-300">Loading content</div>;
  }

  if (!data) {
    return (
      <div className="dark:text-gray-300">
        <div>
          <button
            type="button"
            name="viewToggle"
            className="uppercase dark:text-gray-300"
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
    <div className="ml-2 flex basis-[calc(50%-0.5rem)] flex-col">
      <div className="mb-2 grow border-b border-b-gray-400 pb-2">
        <button
          type="button"
          name="viewToggle"
          className="rounded-md border border-gray-400 px-4 py-2 uppercase dark:text-gray-300"
          onClick={onClickHandler}
        >
          close
        </button>
      </div>
      <div>
        <p className="dark:text-gray-300">
          <b className="font-bold capitalize">{name}</b> detailed data
        </p>
        <ul className="dark:text-gray-300">
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
