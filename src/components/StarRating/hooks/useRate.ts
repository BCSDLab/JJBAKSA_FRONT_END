import { useState } from 'react';

export interface Props {
  onClick?: () => void;
}

export default function useRate({ onClick }: Props) {
  const [hover, setHover] = useState(0);
  const [click, setClick] = useState(0);
  const fixStarCount = (num: number) => {
    setClick(num);
    onClick?.();
  };
  const countStarHover = (num: number) => {
    setHover(num);
  };
  const starHoverLeave = (num: number) => {
    setHover(num);
  };
  return {
    hover,
    click,
    fixStarCount,
    countStarHover,
    starHoverLeave,
  };
}
