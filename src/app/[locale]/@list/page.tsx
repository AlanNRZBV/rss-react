import React from 'react';
import SearchBar from '@/shared/components/SearchBar/SearchBar.tsx';
import PokemonsList from '@/shared/components/PokemonList/PokemonsList.tsx';

const Page = () => {
  return (
    <div className="flex h-full w-full">
      <div className="grow">
        <SearchBar />
        <PokemonsList />
      </div>
    </div>
  );
};

export default Page;
