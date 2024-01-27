import { createContext } from 'react';

export interface StarRateContextType {
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleClick: (num: number) => void;
}

export default createContext<StarRateContextType | null>(null);
