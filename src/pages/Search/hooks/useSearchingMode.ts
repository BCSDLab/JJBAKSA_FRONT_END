import { useCallback, useEffect, useState } from 'react';

const useSearchingMode = () => {
  const [isSearching, setIsSearching] = useState(false);

  const changeMode = useCallback((event: MouseEvent) => {
    if ((event.target as Element).id === 'search-bar-input') {
      setIsSearching(true);
      event.stopPropagation();
    } else {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', changeMode);

    return () => {
      document.removeEventListener('click', changeMode);
    };
  }, [changeMode]);

  return isSearching;
};

export default useSearchingMode;
