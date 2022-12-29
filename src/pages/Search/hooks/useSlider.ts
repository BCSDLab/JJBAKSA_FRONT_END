import { useState } from 'react';

const useSlider = () => {
  const [isOpend, setIsOpend] = useState(false);

  const openSlider = () => {
    setIsOpend(true);
  };

  return { isOpend, openSlider };
};

export default useSlider;
