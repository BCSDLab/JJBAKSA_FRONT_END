import { GetPostContentParam, GetPostContentResponse, GetPostResponse } from './entity';
import postApi from './postApiClient';

export const getPost = async (param: string) => {
  const { data } = await postApi.get<GetPostResponse>(`/post?size=10&${param}`);
  return data;
};
// 페이지가 0부터 시작

export const getPostContent = async (param: GetPostContentParam) => {
  if (param.id) return postApi.get<GetPostContentResponse>(`/post/${param.id}`);
  return null;
};
