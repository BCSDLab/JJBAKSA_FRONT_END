export type Shop = {
  shopId: number,
  placeId: string,
  name: string,
  category: string,

};
export interface ReviewedShopsResponse {
  content: Shop[]
}

export type Review = {
  id:number,
  content: string,
  rate: number,
  createdAt:string

};

export interface ReviewsResPonse {
  content: Review[]
}

export type Scrap = {
  placeId: string,
  category: string,
  name:string,
  photo: string,
  ratingCount: number,
  scrapId: number,
  totalRating: number
};
export interface ScrapResponse {
  content: Scrap[]
}

export interface PatchProfileImageResponse {
  profileImage: {
    id: number,
    originalName: string,
    path: string,
    url: string
  }
}

export interface PatchNicknameResposne {
  nickname:string
}
