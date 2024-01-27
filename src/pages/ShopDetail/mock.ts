import type { FetchShopResponse } from 'api/shop/entity';

const mockShopDetail: FetchShopResponse = {
  placeId: 'mock',
  name: '그릴640',
  formattedAddress: '대한민국 서울특별시 강남구 역삼동 735-25',
  coordinate: {
    lat: 37.4986651,
    lng: 127.0340201,
  },
  formattedPhoneNumber: '02-554-0640',

  category: 'restaurant',
  todayPeriod: {
    openTime: {
      hour: 11,
      minute: 0,
    },
    closeTime: {
      hour: 20,
      minute: 30,
    },
  },
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
