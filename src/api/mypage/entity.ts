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
