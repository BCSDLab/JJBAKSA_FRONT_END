import { useEffect, useState } from 'react';

type Props = { inputRef: React.MutableRefObject<HTMLInputElement | null> };

const useSearchingMode = ({ inputRef }: Props) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleValueChange = () => {
      setIsText(inputRef.current ? inputRef.current.value.length > 0 : false);
    };

    const observer = new MutationObserver(handleValueChange);
    if (inputRef.current) {
      observer.observe(inputRef.current, { attributes: true, childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [inputRef]);

  useEffect(() => {
    const node = inputRef.current;
    const handleInputChange = () => {
      setIsText(node ? node.value.length > 0 : false);
    };

    if (node) {
      node.addEventListener('input', handleInputChange);
    }

    return () => {
      if (node) {
        node.removeEventListener('input', handleInputChange);
      }
    };
  }, [inputRef]);

  useEffect(() => {
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const node = inputRef.current;
    if (node) {
      node.addEventListener('focus', handleFocus);
      node.addEventListener('blur', handleBlur);
    }

    return () => {
      if (node) {
        node.removeEventListener('focus', handleFocus);
        node.removeEventListener('blur', handleBlur);
      }
    };
  }, [inputRef]);

  useEffect(() => {
    setIsSearching(isText || isFocused);
  }, [isText, isFocused]);

  return isSearching;
};

export default useSearchingMode;
