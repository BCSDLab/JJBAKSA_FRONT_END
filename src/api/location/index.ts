import axios from 'axios';
import { NAVER_MAPS_CLIENT_ID, NAVER_MAP_CLOUD_SECRET_ID } from 'config/constants';

const getAddress = async (latitude: number, longitude: number): Promise<string> => {
  const response = await axios.get('/map-reversegeocode/v2/gc', {
    params: {
      coords: `${longitude},${latitude}`,
      sourcecrs: 'epsg:4326',
      orders: 'roadaddr',
      output: 'json',
    },
    headers: {
      'X-NCP-APIGW-API-KEY-ID': NAVER_MAPS_CLIENT_ID,
      'X-NCP-APIGW-API-KEY': NAVER_MAP_CLOUD_SECRET_ID,
    },
  });

  const { data } = response;
  if (data?.results?.length > 0) {
    return `${data.results[0].region.area1.name} ${data.results[0].region.area2.name}`;
  }
  return '주소 정보 없음';
};

export default getAddress;
