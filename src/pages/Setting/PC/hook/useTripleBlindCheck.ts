import { useState } from 'react';

const useTripleBlindCheck = () => {
  const [isCurrentBlind, setIsCurrentBlind] = useState(false);
  const [isNewBlind, setIsNewBlind] = useState(false);
  const [isNewCheckBlind, setIsNewCheckBlind] = useState(false);

  const changeCurrentBlind = () => { setIsCurrentBlind(!isCurrentBlind); };
  const changeNewBlind = () => { setIsNewBlind(!isNewBlind); };
  const changeNewCheckBlind = () => { setIsNewCheckBlind(!isNewCheckBlind); };

  return {
    isCurrentBlind,
    changeCurrentBlind,
    isNewBlind,
    changeNewBlind,
    isNewCheckBlind,
    changeNewCheckBlind,
  };
};

export default useTripleBlindCheck;
