import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { SignUpFormData } from '../SignupPage/entity';

export default function useDropdown(resetValue: string) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  const {
    setValue,
  } = useFormContext<SignUpFormData>();

  const changeDropdownOpen = () => setIsDropdownOpen(!isDropdownOpen);

  const selectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.innerText === resetValue) {
      setSelectedValue('');
    } else {
      setSelectedValue(e.currentTarget.innerText);
    }
    setValue('emailDomain', e.currentTarget.innerText, { shouldDirty: true, shouldValidate: true });
    changeDropdownOpen();
  };

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(e.currentTarget.value);
    setValue('emailDomain', e.currentTarget.value, { shouldDirty: true, shouldValidate: true });
  };

  return {
    isDropdownOpen, selectedValue, changeDropdownOpen, selectValue, changeValue,
  };
}
