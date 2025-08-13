import React from 'react';
import SearchBar from '@/features/SearchBar/SearchBar.tsx';

const Page = () => {
  return (
    <div className="flex h-full w-full">
      <div className="grow">
        <SearchBar />
      </div>
    </div>
  );
};

export default Page;
