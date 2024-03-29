import { useState } from 'react';

import { checkPassword, modify } from 'api/user';
import usePasswordState from 'pages/Setting/hooks/usePasswordState';
import {
  correctError, currentError, existError, PATTERN, typeError,
} from 'pages/Setting/static/setting';
import useBooleanState from 'utils/hooks/useBooleanState';

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
    if (current === newPassword) {
      setMessage(existError);
      setIsShowError(true);
      return false;
    }

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
