import { useState } from 'react';

export interface Props {
  onClick?: () => void;
}

export default function useRate({ onClick }: Props) {
  const [hover, setHover] = useState(0);
  const [rateValue, setRateValue] = useState(0);
  const fillStar = (num: number, event?: string): string => {
    if (event === 'enter') {
      if (hover >= num) {
        return '#ff7f23';
      }
    }
    if (event === 'leave') {
      if (rateValue >= num) {
        return '#ff7f23';
      }
    }
    return '#eeeeee';
  };
  const fixStarCount = (num: number) => {
    setRateValue(num);
    onClick?.();
  };
  const countStarHover = (num: number) => {
    setHover(num);
    fillStar(num, 'enter');
  };
  const starHoverLeave = (num: number) => {
    setHover(0);
    fillStar(num, 'leave');
  };
  return {
    fixStarCount,
    countStarHover,
    starHoverLeave,
    fillStar,
    hover,
  };
}
