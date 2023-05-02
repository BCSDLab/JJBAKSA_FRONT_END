import { GetPostResponse } from './entity';
import postApi from './postApiClient';

const getPost = async (page: number) => {
  const { data } = await postApi.get<GetPostResponse>(`/post?boardType=NOTICE&page=${page - 1}&size=5`);
  return data;
};
// 페이지가 0부터 시작
export default getPost;
