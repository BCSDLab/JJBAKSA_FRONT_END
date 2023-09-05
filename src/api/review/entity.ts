export interface PostReviewParams {
  content:string;
  placeId:string;
  rate:number;
  reviewImages?:Array<string>;
}

export interface LatestReviewResponse {
  lastDate:null | string;
}

export interface FetchParams {
  placeId:string;
  sort:string;
}

export interface GetReviewResponse {
  content:Review[];
  empty:boolean;
  first:boolean;
  last:boolean;
  number:boolean;
  numberOfElements:number;
  pageable:Pagable;
  size:number;
  sort:Sort;
  totalElements:number;
  totalPages:number;
}

interface Review {
  content:string;
  createdAt:string;
  id:number;
  rate:number;
  reviewImages:ReviewImage[];
  shopPlaceId:string;
  userReviewResponse:UserReviewResponse;
}

interface Pagable {
  offset:number;
  pageNumber:number;
  pageSize:number;
  paged:boolean;
  sort:Sort;
  unpaged:boolean;
}

interface ReviewImage {
  imageUrl:string;
  originalname:string;
}

interface UserReviewResponse {
  account:string;
  id:number;
  nickname:string;
}

interface Sort {
  empty:boolean;
  sorted:boolean;
  unsorted:boolean;
}

export interface ReviewParams {
  placeId : string;
  content : string;
  rate : number;
  reviewImages : File[];
}
