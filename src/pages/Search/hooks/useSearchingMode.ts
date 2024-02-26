import { useEffect, useState } from 'react';

type Props = { inputRef: React.MutableRefObject<HTMLInputElement | null> };

const useSearchingMode = ({ inputRef }: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const inputTag = inputRef.current;
    if (inputTag) {
      inputTag.addEventListener('focus', handleFocus);
      inputTag.addEventListener('blur', handleBlur);
    }

    return () => {
      if (inputTag) {
        inputTag.removeEventListener('focus', handleFocus);
        inputTag.removeEventListener('blur', handleBlur);
      }
    };
  }, [inputRef]);

  return { isSearching: isFocused };
};

export default useSearchingMode;
