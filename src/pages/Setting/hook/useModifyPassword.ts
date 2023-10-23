import { checkPassword, modify } from 'api/user';
import { useState } from 'react';
import {
  PATTERN, currentError, typeError, correctError,
} from 'pages/Setting/static/setting';
import useBooleanState from 'utils/hooks/useBooleanState';
import usePasswordState from './usePasswordState';

const useModifyPassword = () => {
  const [isShowError, , , ,setIsShowError] = useBooleanState(false);
  const [isShowModal, , , ,setIsShowModal] = useBooleanState(false);
  const [message, setMessage] = useState<JSX.Element[]>();
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
      setMessage(typeError);
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
      setMessage(currentError);
      setIsShowError(true);
      return false;
    }
  };

  const passwordCorrectCheck = () => {
    if (newPassword !== check) {
      setMessage(correctError);
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
