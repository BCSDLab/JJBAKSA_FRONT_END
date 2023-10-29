import defaultImage from 'assets/images/search/defaultImage.png';

export interface GetItemResponse {
  imageAlt: string,
  phoneNumber: string,
  defaultImage: string,
  image: undefined,
}

export const getMockItem = ():GetItemResponse => {
  const data = {
    imageAlt: '가게 이미지 없음',
    phoneNumber: '010-0000-0000',
    defaultImage,
    image: undefined,
  };
  return data;
};

export const SHOPS = {
  shopName: '카페',
  address: '서울특별시 마포구 서교동',
  phoneNumber: '010-0000-0000',
  status: '영업 중',
  closing: '- 21:00에 영업 종료',
  distance: '내 위치로부터 23m',
};
