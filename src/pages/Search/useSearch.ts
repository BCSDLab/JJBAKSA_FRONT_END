import React, { useState } from 'react';

type ICurrentMode = string | null;

export default function useSearch(state : ICurrentMode) {
  const [text, setText] = useState('');
  const [mode, setMode] = useState(state);

  const changeSearchBarText = (e : React.ChangeEvent<HTMLInputElement>) => {
    setText((e.target.value));
  };

  const changeSearchMode = () => {
    setMode('search');
  };

  const changeTrendingMode = () => {
    setMode('trending');
    setText('');
  };

  return {
    text, mode, changeSearchBarText, changeSearchMode, changeTrendingMode,
  };
}
