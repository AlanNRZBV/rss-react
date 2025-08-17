'use client';
import React, { FC } from 'react';
import { pokemonApi } from '@/lib/api/pokemonApi.ts';
import { useAppDispatch } from '@/lib/hooks.ts';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface Props {
  currentSearchTerm: string | undefined;
  dataFromLs: string | undefined;
  offset: number | undefined;
  hasSingleData: boolean;
  listData: PokemonList | undefined;
  isListLoading: boolean;
  isListFetching: boolean;
}

const PokemonListControls: FC<Props> = ({
  isListFetching,
  isListLoading,
  hasSingleData,
  listData,
}) => {
  const t = useTranslations('HomePage');
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  if (hasSingleData && !listData) {
    return null;
  }

  const extractOffset = (url: string | null): number | undefined => {
    if (!url) return undefined;
    const params = new URL(url).searchParams;
    return parseInt(params.get('offset') || '0', 10);
  };

  const changePage = (direction: 'next' | 'prev') => {
    let newOffset: number | undefined;
    if (direction === 'next' && listData?.next) {
      newOffset = extractOffset(listData.next);
    } else if (direction === 'prev' && listData?.previous) {
      newOffset = extractOffset(listData.previous);
    } else {
      return;
    }

    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (newOffset !== undefined && newOffset > 0) {
      newSearchParams.set('offset', newOffset.toString());
      newSearchParams.set('limit', '10');
    } else {
      newSearchParams.delete('offset');
      newSearchParams.delete('limit');
    }

    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const previous = listData?.previous;

  return (
    <caption className="caption-bottom">
      <div className="mt-2 flex justify-center gap-2">
        <button
          onClick={() => {
            dispatch(pokemonApi.util.invalidateTags(['POKEMON_LIST']));
          }}
          className="mr-auto flex gap-2 rounded-md border border-black px-4 py-2 text-base font-medium uppercase dark:border-gray-400 dark:text-gray-400"
          disabled={isListLoading || isListFetching}
        >
          <span>{t('controlRefresh')}</span>
          {isListLoading ||
            (isListFetching && (
              <svg
                className="size-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="black"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="black"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ))}
        </button>
        <button
          onClick={() => changePage('prev')}
          className={`rounded-md border px-4 py-2 text-base font-medium uppercase ${previous ? 'border-black text-black dark:border-gray-400 dark:text-gray-400' : 'border-gray-400 text-gray-400 dark:border-black dark:text-black'}`}
        >
          {t('controlPrev')}
        </button>
        <button
          onClick={() => changePage('next')}
          className="rounded-md border border-black px-4 py-2 text-base font-medium uppercase dark:border-gray-400 dark:text-gray-400"
        >
          {t('controlNext')}
        </button>
      </div>
    </caption>
  );
};

export default PokemonListControls;
