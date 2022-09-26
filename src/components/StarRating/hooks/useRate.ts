import { useState } from 'react';

export interface StarRatingProps {
  rating: () => void;
}

export default function useRate({ rating }: StarRatingProps) {
  const [hover, setHover] = useState(0);
  const [click, setClick] = useState(0);
  const fixStarCount = (num: number) => {
    setClick(num);
    rating();
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
