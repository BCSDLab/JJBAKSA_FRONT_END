interface Props {
  hoveredStarIndex: number;
  clickedStarIndex: number;
}

export default function useFillStar({ hoveredStarIndex, clickedStarIndex }: Props) {
  const fillStarOfIndex = (num: number, event?: string): string => {
    if (event === 'enter' && hoveredStarIndex >= num) {
      return '#ff7f23';
    }
    if (event === 'leave' && clickedStarIndex >= num) {
      return '#ff7f23';
    }
    return '#eeeeee';
  };
  return { fillStarOfIndex };
}
