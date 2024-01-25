import { User } from 'api/user/entity';

export interface Shop {
  shopId: number,
  placeId: string,
  name: string,
  category: string,
}

export interface ReviewedShopsResponse {
  content: Shop[],
  totalPages: number,
  totalElements: number
}

export interface Review {
  id: number,
  content: string,
  rate: number,
  createdAt: string
}

export interface ReviewsResponse {
  content: Review[]
}

export type Scrap = {
  placeId: string,
  category: string,
  name: string,
  photo: string,
  scrapId: number,
  rate: {
    totalRating: number,
    ratingCount: number,
  }
};
export interface ScrapResponse {
  content: Scrap[],
  totalPages: number,
  totalElements: number,
  empty: boolean,
  last: boolean,
}

export interface PatchProfileImageResponse {
  profileImage: {
    id: number,
    originalName: string,
    path: string,
    url: string
  }
}

export interface PatchNicknameResponse {
  nickname: string;
  // password?: string;
}

export interface FollowersResponse {
  content: User[],
}
