import { useState } from 'react';

export default function useBlindCheck() {
  const [isBlind, setIsBlind] = useState(false);

  const changeBlind = () => { setIsBlind(!isBlind); };

  return {
    isBlind, changeBlind,
  };
}
