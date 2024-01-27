const reviews = [
  {
    content:
      '맛있어요! 다음에 또 오고 싶어요~~~!맛있어요! 다음에 또 오고 싶어요~~~!맛있어요! 다음에 또 오고 싶어요~~~!맛있어요! 다음에 또 오고 싶어요~~~!맛있어요! 다음에 또 오고 싶어요~~~!맛있어요! 다음에 또 오고 싶어요~~~!맛있어요! 다음에 또 오고 싶어요~~~!',
    createdAt: '2023-12-23T06:41:43.493Z',
    id: 1,
    rate: 4.0,
    reviewImages: [],
    shopPlaceId: '',
    userReviewResponse: {
      account: '모름',
      id: 1,
      nickname: '쩝쩝이',
      profileImage: {
        id: 1,
        originalName: '김민재',
        path: '모름',
        url: 'https://fastly.picsum.photos/id/104/200/200.jpg?hmac=3XxEVXVjwoI45-6sum_iMwNZ52GT-SJacVWr4fh4hqI',
      },
    },
  },
  {
    content: '전 여기 별로였어요. 아니 왜 이렇게 맛이 없지 우에엑~',
    createdAt: '2023-12-24T06:41:43.493Z',
    id: 2,
    rate: 3.0,
    reviewImages: [],
    shopPlaceId: '',
    userReviewResponse: {
      account: '모름',
      id: 2,
      nickname: '짭짭이',
      profileImage: null,
    },
  },
];

const mockReviews = {
  content: [...reviews, ...reviews],
  pageable: {
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    offset: 0,
    pageNumber: 0,
    pageSize: 3,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 2,
  totalElements: 4,
  size: 3,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  first: true,
  numberOfElements: 0,
  empty: true,
};

export default mockReviews;
