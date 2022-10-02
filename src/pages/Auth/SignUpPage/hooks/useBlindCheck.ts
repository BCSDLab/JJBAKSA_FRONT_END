import { useState } from 'react';

export default function useBlindCheck() {
  const [isBlind, setIsBlind] = useState(false);

  const changeBlind = () => {
    setIsBlind((state: boolean) => !state);
  };

  return {
    isBlind, changeBlind,
  };
}
