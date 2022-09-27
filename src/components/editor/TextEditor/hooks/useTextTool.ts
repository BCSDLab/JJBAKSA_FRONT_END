import { useState } from 'react';

export default function useTextTools() {
  const [isShow, setIsShow] = useState(false);
  const changeView = () => {
    setIsShow((prev) => !prev);
  };
  return {
    isShow,
    changeView,
  };
}
