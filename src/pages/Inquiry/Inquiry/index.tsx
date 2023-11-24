/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as WriteIcon } from 'assets/svg/inquiry/write.svg';
import InquirySelectButton from 'pages/Inquiry/Inquiry/components/InquirySelectButton';
import SearchBar from 'pages/Inquiry/Inquiry/components/SearchBar';
import InquiryList from 'pages/Inquiry/Inquiry/components/InquiryList';
import styles from './Inquiry.module.scss';

export default function Inquiry(): JSX.Element {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const pathParts = location.pathname.split('/');

  const type = pathParts[2]; // 'all' 또는 'my' 또는 'search'
  const [typePath, setTypePath] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>(type);

  // typePath는 서버에 데이터를 요청할 때 사용
  useEffect(() => {
    setSelectedTab(type);
    switch (type) {
      case 'all':
        setTypePath('');
        break;
      case 'my':
        setTypePath('/me');
        break;
      case 'search':
        setTypePath(`/search/${keyword}`);
        break;
      default:
        break;
    }
  }, [type]);

  // SearchBar의 값이 변경되었을 때 수행할 작업
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
              isSelected={selectedTab === 'all'}
            />
          </li>

          <li className={`${styles.menu__item} ${styles.menu__select}`}>
            <InquirySelectButton
              path="/inquiry/my"
              text="나의 문의 내역"
              isSelected={selectedTab === 'my'}
            />
          </li>

          <li className={`${styles.menu__item} ${styles.menu__inquire}`}>
            <Link to="/inquiry/inquire" className={styles.menu__link}>
              문의하러 가기
              <WriteIcon />
            </Link>
          </li>
        </ul>

        <div className={styles['contents-box']}>
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
              typePath={typePath}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
