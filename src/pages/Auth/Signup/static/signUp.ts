interface Domain {
  key: number;
  name: string;
  address: string;
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
    address: 'koreatech.ac.kr',
  },
  {
    key: 7,
    name: '직접 입력',
    address: '직접 입력',
  },
];

const ERROR_MESSAGE = {
  id: '아이디 중복확인을 해주세요.',
  email: '존재하지 않는 도메인입니다.',
  password: '비밀번호는 문자, 숫자, 특수문자를 포함한 8~16자리로 이루어져야합니다.',
  passwordCheck: '비밀번호가 일치하지 않습니다.',
  nickname: '닉네임은 한글, 영문, 숫자만 가능하며 2-10자리로 이루어져야합니다',
};

export { DOMAIN, ERROR_MESSAGE };
