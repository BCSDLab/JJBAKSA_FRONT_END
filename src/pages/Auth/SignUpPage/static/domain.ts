interface IDomain {
  key: number;
  name: string;
  address: string;
}

const domain: IDomain[] = [{
  key: 1,
  name: 'naver',
  address: 'naver.com',
},
{
  key: 2,
  name: 'koreatech',
  address: 'koreactech.co.kr',
},
];

export default domain;
