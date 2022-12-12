import { useState } from 'react';

const useBlindCheck = () => {
  const [isBlind, setIsBlind] = useState(false);

  const changeBlind = () => { setIsBlind(!isBlind); };

  return {
    isBlind, changeBlind,
  };
};

export default useBlindCheck;
