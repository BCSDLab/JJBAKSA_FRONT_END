export interface PostScrapParams {
  directoryId:number;
  placeId:string;
}

export interface PostScrapResponse {
  createdAt:string;
  directory:{
    createdAt:string;
    id:number;
    name:string;
    scrapCount:number;
    updatedAt:string;
  }
  id:number;
  shopId:number;
  updatedAt:string;
}

export interface GetScrapResponse {
  content: Content[];
  empty:boolean;
  first:boolean;
  last:boolean;
  number:number;
  numberOfElements:number;
  pagable: Pagable;
  size:number;
  sort: Sort;
  totalElements:number;
  totalPages:number;
}

interface Content {
  address:string;
  category:string;
  name:string;
  photo:string;
  placeId:string;
  ratingCount:number;
  scrapId:number;
  totalRating:number;
}

interface Pagable {
  offset:number;
  pageNumber:number;
  pageSize:number;
  paged:boolean;
  sort: Sort[];
  unpaged:boolean;
}

interface Sort {
  empty:boolean;
  sorted:boolean;
  unsorted:boolean;
}
