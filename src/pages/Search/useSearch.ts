import { ChangeEvent, useState } from 'react';

type ICurrentMode = string | null;

export default function useSearch(state : ICurrentMode) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState(state);

  const textHandler = (e : ChangeEvent<HTMLInputElement>) => {
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
