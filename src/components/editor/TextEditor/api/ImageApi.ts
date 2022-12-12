import axios from 'axios';
import { useQuery } from 'react-query';

// 현재는 랜덤 이미지를 받아오는 api를 담고 있습니다.
const ImageAPI = () => {
  const { isError, data, refetch } = useQuery('getImage', () => axios.get('https://dog.ceo/api/breeds/image/random'), {
    refetchOnWindowFocus: false,
    retry: 0,
  });
  return { isError, data, refetch };
};

export default ImageAPI;
