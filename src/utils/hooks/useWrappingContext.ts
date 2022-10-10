import { useContext } from 'react';

export default function useWrappingContext<T>(
  ContextValue: React.Context<T | null>,
) {
  const state = useContext(ContextValue);
  if (state == null) throw new Error('ContextValue.Provider가 존재하지 않습니다.');
  return state;
}
