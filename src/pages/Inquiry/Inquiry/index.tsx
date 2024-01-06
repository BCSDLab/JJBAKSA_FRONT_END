/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { ReactComponent as WriteIcon } from 'assets/svg/inquiry/write.svg';
import InquirySelectButton from 'pages/Inquiry/Inquiry/components/InquirySelectButton';
import SearchBar from 'pages/Inquiry/Inquiry/components/SearchBar';
import InquiryList from 'pages/Inquiry/Inquiry/components/InquiryList';

import styles from './Inquiry.module.scss';

type QueryTypeMap = {
  all: string;
  my: string;
  search: string;
};

type QueryType = keyof QueryTypeMap;

const createQueryTypeMap = (keyword: string): QueryTypeMap => ({
  all: '',
  my: '/me',
  search: `/search/${keyword}`,
});

export default function Inquiry(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const [keyword, setKeyword] = useState('');
  const queryTypeMap = createQueryTypeMap(keyword);

  const rawPageType = location.pathname.split('/')[2];
  const pageType = Object.keys(queryTypeMap).includes(rawPageType) ? rawPageType as QueryType : 'all';

  const [queryType, setQueryType] = useState<string>(queryTypeMap[pageType] || '');

  useEffect(() => {
    const newPageType = Object.keys(queryTypeMap).includes(rawPageType) ? rawPageType as QueryType : 'all';
    setQueryType(queryTypeMap[newPageType] || '');
  }, [location.pathname, keyword]);

  const handleSearchChange = (text: string) => {
    setKeyword(text);
  };

  const handleSearchSubmit = () => {
    navigate(`${location.pathname}?keyword=${keyword}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles['inner-container']}>
        <ul className={styles.menu}>
          <li className={`${styles.menu__item} ${styles.menu__title}`}>
            <Link to="/inquiry/all" className={styles.menu__link}>
              <div className={styles['menu__title-text']}>
                문의하기
              </div>
            </Link>
          </li>

          <li className={`${styles.menu__item} ${styles.menu__select}`}>
            <InquirySelectButton
              path="/inquiry/all"
              text="전체 문의 내역"
              isSelected={pageType === 'all'}
            />
          </li>

          <li className={`${styles.menu__item} ${styles.menu__select}`}>
            <InquirySelectButton
              path="/inquiry/my"
              text="나의 문의 내역"
              isSelected={pageType === 'my'}
            />
          </li>

          <li className={`${styles.menu__item} ${styles.menu__inquire}`}>
            <Link to="/inquiry/inquire" className={styles.menu__link}>
              문의하러 가기
            </Link>
            <WriteIcon />
          </li>
        </ul>

        <div className={styles['content-box']}>
          <div className={styles['search-bar']}>
            <SearchBar
              className={styles['search-bar__item']}
              onSearchChange={handleSearchChange}
              onSearchSubmit={handleSearchSubmit}
            />
          </div>

          <div className={styles['inquiry-list']}>
            <InquiryList
              className={styles['inquiry-list__item']}
              queryType={queryType}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
