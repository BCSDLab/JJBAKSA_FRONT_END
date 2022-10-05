import { useState } from 'react';

export default function useSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectValue, isSelectValue] = useState('');

  const changeOpenState = () => setIsOpen(!isOpen);

  const selectDomain = (e:any) => {
    if (e.target.innerText !== '직접 입력') {
      isSelectValue(e.target.innerText);
    } else {
      isSelectValue('');
    }
    setIsOpen(!isOpen);
  };

  return {
    isOpen, selectValue, changeOpenState, selectDomain,
  };
}
