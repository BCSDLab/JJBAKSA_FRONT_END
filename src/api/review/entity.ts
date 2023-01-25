interface ImageInfo {
  imageId: number,
  imageUrl: string,
  originalName: string,
  path: string,
}

export interface ReviewInfo {
  content: string,
  rate: number,
  reviewImages: ImageInfo[],
  shopId: number,
}
