export interface GetInquiryResponse {
  content: InquiryContent[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: InquiryPageable;
  size: number;
  sort: InquirySort;
  totalElements: number;
  totalPages: number;
}

export interface InquiryContent {
  answer: string;
  content: string;
  createdAt: string;
  createdBy: string;
  id: number;
  inquiryImages: InquiryImage[];
  isSecreted: number;
  title: string;
}

export interface InquiryImage {
  imageUrl: string;
  originalName: string;
  path: string;
}

export interface InquiryPageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: InquirySort;
  unpaged: boolean;
}

export interface InquirySort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface InquiryProps {
  queryType: string;
  dateCursor: string | null;
  idCursor: number | null;
  size: number;
}

export interface SubmitInquiryProps {
  title: string;
  content: string;
  inquiryImages: string[] | null;
  isSecret: boolean;
}
