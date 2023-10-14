import { useState } from 'react';

const usePasswordState = () => {
  const [current, setCurrent] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [check, setCheck] = useState('');

  const handleCurrent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.target.value);
  };
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewPassword(e.target.value);
  };
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.value);
  };

  return {
    current,
    handleCurrent,
    newPassword,
    handleNewPassword,
    check,
    handleCheck,
  };
};

export default usePasswordState;
