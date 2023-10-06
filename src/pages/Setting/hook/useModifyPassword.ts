import { checkPassword, modify } from 'api/user';
import { useState } from 'react';
import { PATTERN, ERROR_MESSAGE } from 'pages/Setting/static/setting';

const useModifyPassword = () => {
  const [current, setCurrent] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [check, setCheck] = useState('');
  const [isShowError, setIsShowError] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [message, setMessage] = useState('');
  const handleCurrent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrent(e.target.value);
  };
  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setnewPassword(e.target.value);
  };
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(e.target.value);
  };

  const typeCheck = (pw: string) => {
    if (!PATTERN.test(pw)) {
      setMessage(ERROR_MESSAGE.Type_Error);
      setIsShowError(true);
      return false;
    }
    return true;
  };

  const passwordCheck = async () => {
    try {
      typeCheck(current);
      await checkPassword({ password: current });
      return true;
    } catch (e) {
      setMessage(ERROR_MESSAGE.Current_Error);
      setIsShowError(true);
      return false;
    }
  };

  const passwordCorrectCheck = () => {
    if (newPassword !== check) {
      setMessage(ERROR_MESSAGE.Correct_Error);
      setIsShowError(true);
      return false;
    }
    return true;
  };

  const modifyPassword = async () => {
    const nextStep = await passwordCheck();
    if (nextStep && typeCheck(newPassword) && passwordCorrectCheck()) {
      await modify({ password: newPassword });
      setIsShowModal(true);
    }
  };

  return {
    current,
    handleCurrent,
    newPassword,
    handleNewPassword,
    check,
    handleCheck,
    modifyPassword,
    isShowError,
    message,
    isShowModal,
    setIsShowError,
    setIsShowModal,
  };
};

export default useModifyPassword;
