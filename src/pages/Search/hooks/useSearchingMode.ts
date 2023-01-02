import { useCallback, useEffect, useState } from 'react';

const useSearchingMode = () => {
  const [isSearching, setIsSearching] = useState(false);

  const changeMode = useCallback((event: MouseEvent) => {
    if ((event.target as Element).id === 'searchBarInput') {
      setIsSearching(true);
    } else if ((event.target as Element).id === 'root') {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', changeMode);

    return () => {
      document.removeEventListener('click', changeMode);
    };
  }, [changeMode, isSearching]);

  return isSearching;
};

export default useSearchingMode;
