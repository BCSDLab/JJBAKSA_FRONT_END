import { SetStateAction, useState } from 'react';

export default function useSearch(state : 'search' | 'trending' | null) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState(state);

  const textHandler = (e: { target: { value: SetStateAction<string> } }) => {
    setText(e.target.value);
  };

  const focusHandler = () => {
    setMode('search');
  };

  const blurHandler = () => {
    setMode('trending');
  };

  return {
    text, mode, textHandler, focusHandler, blurHandler,
  };
}
