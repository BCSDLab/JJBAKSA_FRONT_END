import { useContext } from 'react';

export interface ContextType {
  handleEnter: () => void;
  handleClick: (num: number) => void;
  handleLeave: () => void;
  onClick?: () => void;
}

export default function useStarContainerContext({
  StarRatingContext,
}: { StarRatingContext: React.Context<ContextType | null> }) {
  const state = useContext(StarRatingContext);
  if (!state) throw new Error('StarRatingContextProvider not found');
  return state;
}
