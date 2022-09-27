import { useState } from 'react';

export default function useStarIndex() {
  const [hoveredStarIndex, setHoveredStarIndex] = useState(0);
  const [clickedStarIndex, setClickedStarIndex] = useState(0);
  return {
    hoveredStarIndex,
    setHoveredStarIndex,
    clickedStarIndex,
    setClickedStarIndex,
  };
}
