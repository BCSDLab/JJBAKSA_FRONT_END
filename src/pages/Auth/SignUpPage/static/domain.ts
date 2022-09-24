interface IDomain {
  key: number;
  name: string;
  address: string;
}

const domain: IDomain[] = [
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

export default domain;
