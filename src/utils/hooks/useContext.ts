import { useContext } from 'react';

export default function useStarContainerContext<Type>(
  ContextValue: React.Context<Type | null>,
) {
  const state = useContext(ContextValue);
  if (!state) throw new Error('Provider not found');
  return state;
}
