import { useState } from 'react';

const usePasswordState = () => {
  const [current, setCurrent] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [check, setCheck] = useState('');

  const handleCurrentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.target.value);
  };
  const handleNewPasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewPassword(e.target.value);
  };
  const handleCheckInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.value);
  };

  return {
    current,
    handleCurrentInput,
    newPassword,
    handleNewPasswordInput,
    check,
    handleCheckInput,
  };
};

export default usePasswordState;
