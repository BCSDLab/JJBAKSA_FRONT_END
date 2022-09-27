import { useContext } from 'react';

export default function useStarContainerContext<T>(
  ContextValue: React.Context<T | null>,
) {
  const state = useContext(ContextValue);
  if (!state) throw new Error('Provider not found');
  return state;
}
