interface Privacy {
  key: number;
  summary: string;
  content: string;
}

const privacy: Privacy[] = [
  {
    key: 1,
    summary: '개인정보 이용약관(필수)',
    content: '제1조(목적)\n한강 서비스 이용약관은 bcsd lab에서 서비스를 제공함에 있어,\n이용자간의 관리, 의무 및 책임 사항 등을 목적으로 합니다.',
  },
  {
    key: 2,
    summary: '쩝쩝박사 이용약관(필수)',
    content: `제1조(목적)\n한강 서비스 이용약관은 bcsd lab에서 서비스를 제공함에 있어,\n이용자간의 관리, 의무 및 책임 사항 등을 목적으로 합니다.
    \n\n커뮤니티 이용규칙\n한강 서비스 이용약관은 bcsd lab에서 서비스를 제공함에 있어,\n이용자간의 관리, 의무 및 책임 사항 등을 목적으로 합니다.`,
  },
];

export default privacy;
