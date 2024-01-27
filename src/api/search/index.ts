import {
  FetchAutoCompleteParams,
  FetchAutoCompleteResponse,
  FetchTrendingsResponse,
} from './entity';
import searchApi from './searchApiClient';

export const fetchTrendings = () => searchApi.get<FetchTrendingsResponse>('/trending');

export const fetchAutoComplete = (params: FetchAutoCompleteParams) => {
  const { query, location } = params;
  const url = `/shops/auto-complete?query=${query}`;
  const requestBody = {
    lat: location?.lat,
    lng: location?.lng,
  };

  return searchApi.post<FetchAutoCompleteResponse>(url, requestBody);
};
