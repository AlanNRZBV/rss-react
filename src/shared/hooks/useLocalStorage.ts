import { useEffect, useState } from 'react';

const useLocalStorage = () => {
  const [dataFromLs, setDataFromls] = useState<string | undefined>(undefined);
  useEffect(() => {
    const valueFromStorage = localStorage.getItem('searchValue');
    if (valueFromStorage && valueFromStorage.trim().length > 0) {
      setDataFromls(valueFromStorage);
    }
  }, []);

  const setLocalState = (arg: string) => {
    setDataFromls(arg);
    localStorage.setItem('searchValue', arg);
  };

  const resetLocalState = () => {
    setDataFromls(undefined);
    localStorage.removeItem('searchValue');
  };

  return {
    dataFromLs,
    setLocalState,
    resetLocalState,
  };
};

export default useLocalStorage;
