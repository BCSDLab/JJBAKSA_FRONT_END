import { checkPassword, modify } from 'api/user';
import { useState } from 'react';
import { PATTERN, ERROR_MESSAGE } from 'pages/Setting/static/setting';
import useBooleanState from 'utils/hooks/useBooleanState';
import usePasswordState from './usePasswordState';

const useModifyPassword = () => {
  const [isShowError, , , ,setIsShowError] = useBooleanState(false);
  const [isShowModal, , , ,setIsShowModal] = useBooleanState(false);
  const [message, setMessage] = useState('');
  const {
    current,
    handleCurrentInput,
    newPassword,
    handleNewPasswordInput,
    check,
    handleCheckInput,
  } = usePasswordState();

  const typeCheck = (pw: string) => {
    if (!PATTERN.test(pw)) {
      setMessage(ERROR_MESSAGE.typeError);
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
      setMessage(ERROR_MESSAGE.currentError);
      setIsShowError(true);
      return false;
    }
  };

  const passwordCorrectCheck = () => {
    if (newPassword !== check) {
      setMessage(ERROR_MESSAGE.currentError);
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
    handleCurrentInput,
    newPassword,
    handleNewPasswordInput,
    check,
    handleCheckInput,
    modifyPassword,
    isShowError,
    message,
    isShowModal,
    setIsShowError,
    setIsShowModal,
  };
};

export default useModifyPassword;
