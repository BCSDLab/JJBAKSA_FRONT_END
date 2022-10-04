import { useState } from 'react';

export default function useBooleanStateList() {
  const [booleanStateList, setBooleanStateList] = useState<boolean[] | null>(null);
  const onlyOneTruthHandler = (index: number) => {
    setBooleanStateList((prev) => (
      prev && prev.map((bool, prevIndex) => (index === prevIndex || bool ? !bool : bool))));
  };
  const onlyOneFalseHandler = (index: number) => {
    setBooleanStateList((prev) => (
      prev && prev.map((bool, prevIndex) => (index === prevIndex || !bool ? !bool : bool))));
  };
  const pushBooleanState = (state: boolean) => {
    if (booleanStateList === null) setBooleanStateList([state]);
    if (booleanStateList !== null) setBooleanStateList((prev) => prev && [...prev, state]);
  };
  const popBooleanState = () => {
    // 미구현
  };
  const removeBooleanState = (state: boolean) => {
    setBooleanStateList((prev) => (
      prev && prev.filter((bool) => !state === bool)
    ));
  };
  return {
    booleanStateList,
    setBooleanStateList,
    onlyOneTruthHandler,
    onlyOneFalseHandler,
    pushBooleanState,
    popBooleanState,
    removeBooleanState,
  };
}
