import { useEffect, useState } from 'react';

const useLocalStorage = () => {
  const [dataFromLs, setDataFromLs] = useState<string | undefined>(undefined);
  useEffect(() => {
    const valueFromStorage = localStorage.getItem('searchValue');
    if (valueFromStorage && valueFromStorage.trim().length > 0) {
      setDataFromLs(valueFromStorage);
    }
  }, []);

  const setLocalState = (arg: string) => {
    setDataFromLs(arg);
    localStorage.setItem('searchValue', arg);
  };

  const resetLocalState = () => {
    setDataFromLs(undefined);
    localStorage.removeItem('searchValue');
  };

  return {
    dataFromLs,
    setLocalState,
    resetLocalState,
  };
};

export default useLocalStorage;
