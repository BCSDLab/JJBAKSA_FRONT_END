import React, { useState } from 'react';

type ICurrentMode = string | null;

export default function useSearch(state : ICurrentMode) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState(state);

  const changeSearchBarText = (e : React.ChangeEvent) => {
    setText((e.target as HTMLInputElement).value);
  };

  const changeSearchMode = () => {
    setMode('search');
  };

  const changeTrendingMode = () => {
    setMode('trending');
  };

  return {
    text, mode, changeSearchBarText, changeSearchMode, changeTrendingMode,
  };
}
