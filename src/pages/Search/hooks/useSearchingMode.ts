import { useEffect, useState } from 'react';

type Props = { inputRef: React.MutableRefObject<HTMLInputElement | null> };

const useSearchingMode = ({ inputRef }: Props) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const inputTag = inputRef.current;
    const handleInputChange = () => {
      setIsText(inputTag ? inputTag.value.length > 0 : false);
    };

    const observer = new MutationObserver(handleInputChange);
    if (inputTag) {
      observer.observe(inputTag, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [inputRef]);

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

  useEffect(() => {
    setIsSearching(isText || isFocused);
  }, [isText, isFocused]);

  return isSearching;
};

export default useSearchingMode;
