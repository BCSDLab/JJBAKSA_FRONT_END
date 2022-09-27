import { useState } from 'react';

export default function useCheckRate() {
  const [isActive, setIsActive] = useState(false);
  const setActive = () => {
    setIsActive(true);
  };
  const setDeActive = () => {
    setIsActive(false);
  };
  return {
    isActive,
    setActive,
    setDeActive,
  };
}
