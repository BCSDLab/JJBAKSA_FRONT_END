import { useState } from 'react';

export default function useBooleanStateList() {
  const [stateList, setStateList] = useState<boolean[] | null>(null);
  const onlyOneTruthHandler = (index: number) => {
    setStateList((prev) => (
      prev && prev.map((bool, prevIndex) => (index === prevIndex || bool ? !bool : bool))));
  };
  const onlyOneFalseHandler = (index: number) => {
    setStateList((prev) => (
      prev && prev.map((bool, prevIndex) => (index === prevIndex || !bool ? !bool : bool))));
  };
  const getState = (index: number) => stateList && stateList[index];
  const pushState = (state: boolean) => {
    if (stateList === null) setStateList([state]);
    if (stateList !== null) setStateList((prev) => prev && [...prev, state]);
  };
  const popState = () => {
    // 미구현
  };
  const removeState = (state: boolean) => {
    setStateList((prev) => (
      prev && prev.filter((bool) => !state === bool)
    ));
  };
  return {
    stateList,
    getState,
    setStateList,
    onlyOneTruthHandler,
    onlyOneFalseHandler,
    pushState,
    popState,
    removeState,
  };
}
