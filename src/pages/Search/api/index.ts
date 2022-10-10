import { SearchQueryParams } from './search/entity';
import searchApi from './search/searchApiClient';

// 검색창에서 쿼리에 대한 리스트 받아오기
const querySeachText = ({ searchQuery } : SearchQueryParams) => searchApi.get(`/search/${searchQuery}`);

export default querySeachText;
