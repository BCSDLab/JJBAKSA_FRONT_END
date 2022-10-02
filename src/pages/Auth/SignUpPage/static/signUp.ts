interface Domain {
  key: number;
  name: string;
  address: string;
}

export interface ErrorMessage {
  id: string;
  email: string
  password: string;
  passwordCheck: string;
}

const DOMAIN: Domain[] = [
  {
    key: 1,
    name: 'gmail',
    address: 'gmail.com',
  },
  {
    key: 2,
    name: 'naver',
    address: 'naver.com',
  },
  {
    key: 3,
    name: 'kakao',
    address: 'kakao.com',
  },
  {
    key: 4,
    name: 'daum',
    address: 'daum.com',
  },
  {
    key: 5,
    name: 'nate',
    address: 'nate.com',
  },
  {
    key: 6,
    name: 'koreatech',
    address: 'koreatech.co.kr',
  },
  {
    key: 7,
    name: '직접 입력',
    address: '직접 입력',
  },
];

const ERROR_MESSAGE : ErrorMessage = {
  id: '아이디 중복확인을 해주세요.',
  email: '존재하지 않는 도메인입니다.',
  password: '비밀번호는 문자, 숫자, 특수문자를 포함한 2~16자리로 이루어져야합니다.',
  passwordCheck: '비밀번호가 일치하지 않습니다.',
};

export { DOMAIN, ERROR_MESSAGE };
