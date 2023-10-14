const SETTING_TEXT = {
  requiredLogin: '로그인이 필요한 서비스입니다.',
};

export const PATTERN = /^.*(?=^.{2,16}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 비밀번호 형식 패턴

export const currentError = [
  <span>
    현재 비밀번호가 일치하지 않습니다.
  </span>,
];

export const typeError = [
  <span>
    비밀번호는 문자, 숫자, 특수문자를 포함한
    <br />
    8~16 자리로 이루어져야 합니다.
  </span>,
];

export const correctError = [
  <span>
    새 비밀번호가 일치하지 않습니다.
  </span>,
];

export default SETTING_TEXT;
