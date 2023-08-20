export interface FetchTrendingsResponse {
  trendings: string[]
}

export interface SearchQueryParams {
  searchText : string;
}

export interface ShopsParams {
  keyword: string;
  location: Coords;
}

export interface FetchShopsResponse {
  content: Shop[];
}

interface Shop {
  address: string,
  dist: 0,
  placeId: string,
  placeName: string,
  score: number,
  shopId: number,
  x: string,
  y: string,
}

export interface ShopPinResponse {
  businessDay:string;
  category:string;
  formattedAddress:string;
  formattedPhoneNumber:string;
  lateReviewDate:string;
  lat:number;
  lng:number;
  name:string;
  openNow:boolean;
  photos:string[];
  placeId:string;
  ratingCount:number;
  scrap:boolean;
  shopId:number;
  todayBusinessHour:string;
  totalRating:number;
}

export interface Coords {
  latitude: number,
  longitude: number
}
