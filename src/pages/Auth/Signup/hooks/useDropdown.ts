import { useState } from 'react';

export default function useDropdown(resetValue: string) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const changeDropdownOpen = () => setIsDropdownOpen(!isDropdownOpen);

  const selectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.innerText === resetValue) {
      setSelectedValue('');
    } else {
      setSelectedValue(e.currentTarget.innerText);
    }
    changeDropdownOpen();
  };

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.currentTarget.value);
  };

  return {
    isDropdownOpen, selectedValue, changeDropdownOpen, selectValue, changeValue,
  };
}
