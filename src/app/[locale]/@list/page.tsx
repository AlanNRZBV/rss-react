import React from 'react';
import SearchBar from '@/shared/components/SearchBar/SearchBar.tsx';
import PokemonsList from '@/shared/components/PokemonList/PokemonsList.tsx';

const Page = () => {
  return (
    <>
      <SearchBar />
      <PokemonsList />
    </>
  );
};

export default Page;
