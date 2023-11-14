import type { FetchShopResponse } from 'api/shop/entity';

const mockShopDetail: FetchShopResponse = {
  shopId: 44,
  placeId: 'mock',
  name: '그릴640',
  formattedAddress: '대한민국 서울특별시 강남구 역삼동 735-25',
  lat: 37.4986651,
  lng: 127.0340201,
  formattedPhoneNumber: '02-554-0640',
  openNow: true,
  totalRating: -1,
  ratingCount: 1,
  category: 'restaurant',
  todayPeriod: [1130, 2230],
  periods: [
    null,
    {
      open: {
        day: 1,
        time: 1130,
      },
      close: {
        day: 1,
        time: 2230,
      },
    },
    {
      open: {
        day: 2,
        time: 1130,
      },
      close: {
        day: 2,
        time: 2230,
      },
    },
    {
      open: {
        day: 3,
        time: 1130,
      },
      close: {
        day: 3,
        time: 2230,
      },
    },
    {
      open: {
        day: 4,
        time: 1130,
      },
      close: {
        day: 4,
        time: 2230,
      },
    },
    {
      open: {
        day: 5,
        time: 1130,
      },
      close: {
        day: 5,
        time: 2230,
      },
    },
    {
      open: {
        day: 6,
        time: 1730,
      },
      close: {
        day: 6,
        time: 2200,
      },
    },
  ],
  scrap: null,
  photos: [
    'https://fastly.picsum.photos/id/741/200/300.jpg?hmac=xaQ9kS4D9YUXp1ih8_9I1Bo0GlrWrUW2UxRv52xf8dU',
    'https://fastly.picsum.photos/id/741/200/300.jpg?hmac=xaQ9kS4D9YUXp1ih8_9I1Bo0GlrWrUW2UxRv52xf8dU',
    'https://fastly.picsum.photos/id/741/200/300.jpg?hmac=xaQ9kS4D9YUXp1ih8_9I1Bo0GlrWrUW2UxRv52xf8dU',
    'https://fastly.picsum.photos/id/741/200/300.jpg?hmac=xaQ9kS4D9YUXp1ih8_9I1Bo0GlrWrUW2UxRv52xf8dU',
    'https://fastly.picsum.photos/id/741/200/300.jpg?hmac=xaQ9kS4D9YUXp1ih8_9I1Bo0GlrWrUW2UxRv52xf8dU',
    'https://fastly.picsum.photos/id/741/200/300.jpg?hmac=xaQ9kS4D9YUXp1ih8_9I1Bo0GlrWrUW2UxRv52xf8dU',
  ],
};

export default mockShopDetail;
