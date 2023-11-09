import { http, HttpResponse } from 'msw';
import { API_PATH } from 'config/constants';
import shopsResultData from './data/shopsResultData';

interface RequestBody {
  lat: number | undefined;
  lng: number | undefined;
}

const handlers = [
  http.post(`${API_PATH}/shops`, async ({ request }) => {
    const body = await request.json() as RequestBody;

    body.lat = 37.71;
    body.lng = 127.97;

    const url = new URL(request.url.toString());
    const keyword = url.searchParams.get('keyword');

    if (typeof body.lat !== 'number' || typeof body.lng !== 'number') {
      return new HttpResponse(null, { status: 401 });
    }

    const filteredShops = shopsResultData.filter((shop) => shop.name.includes(keyword ?? ''));
    return HttpResponse.json({
      shopQueryResponseList: filteredShops,
    });
  }),
];

export default handlers;
