import { useNavigate } from 'react-router-dom';

import { login } from 'api/user';
import { PASSWORD_REGEXP } from 'components/Auth/static/Regexp';
import { useUpdateAuth } from 'store/auth';
import checkAxiosErrorMessage from 'utils/ts/checkAxiosError';

import { LoginFormInput } from './entity';

const useLoginRequest = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (success: string) => void;
  onError?: (error: string) => void;
}) => {
  const navigate = useNavigate();
  const updateAuth = useUpdateAuth();

  const submitLogin = async ({
    id,
    password,
    isAutoLoginChecked,
  }: LoginFormInput) => {
    if (!PASSWORD_REGEXP.test(password)) {
      onError?.('비밀번호는 문자, 숫자, 특수문자를 포함한 8~16자리로 이루어져야 합니다.');
    } else {
      try {
        const { data } = await login({
          account: id,
          password,
        });

        sessionStorage.setItem('accessToken', data.accessToken);
        await updateAuth();

        // 자동로그인
        if (isAutoLoginChecked) {
          localStorage.setItem('refreshToken', data.refreshToken);
        }

        navigate('/');
        onSuccess?.('성공');
      } catch (error) {
        if (checkAxiosErrorMessage(error)) {
          onError?.(error.response?.data.errorMessage ?? '서버 통신 중 오류가 발생했습니다.');
        }
      }
    }
  };

  return submitLogin;
};

export default useLoginRequest;
