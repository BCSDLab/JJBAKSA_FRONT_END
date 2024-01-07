import { http, HttpResponse } from 'msw';

import { API_PATH } from 'config/constants';

import shopsResultData from './data/shopsResultData';

interface RequestBody {
  lat: number;
  lng: number;
}

const handlers = [
  http.post(`${API_PATH}/shops`, async ({ request }) => {
    const body = await request.json() as RequestBody;

    const url = new URL(request.url.toString());
    const keyword = url.searchParams.get('keyword');

    if (typeof body.lat !== 'number' || typeof body.lng !== 'number') {
      return new HttpResponse(null, { status: 500 });
    }

    const filteredShops = shopsResultData.filter((shop) => keyword && shop.name.includes(keyword));

    return HttpResponse.json({
      pageToken: null,
      shopQueryResponseList: filteredShops,
    });
  }),
];

export default handlers;
