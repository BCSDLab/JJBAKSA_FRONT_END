import { useState } from 'react';

export default function useDropdown() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const changeDropdownOpen = () => setIsDropdownOpen(!isDropdownOpen);

  const select = (e: React.MouseEvent<HTMLLIElement>) => {
    setSelectedValue(e.currentTarget.innerText);
    changeDropdownOpen();
  };

  return {
    isDropdownOpen, selectedValue, changeDropdownOpen, select, setSelectedValue,
  };
}
