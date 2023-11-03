/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as WriteIcon } from 'assets/svg/inquiry/write.svg';
import InquirySelectButton from 'pages/Inquiry/Inquiry/components/InquirySelectButton';
import SearchBar from 'pages/Inquiry/Inquiry/components/SearchBar';
import DataTable from 'pages/Inquiry/Inquiry/components/DataTable';
import styles from './Inquiry.module.scss';

const useSearchForm = () => {
  const [text, setText] = useState('');
  const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setText((e.target.value));
  };

  return {
    text, handleChange,
  };
};

export default function Inquiry(): JSX.Element {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const type = pathParts[2]; // 'all' 또는 'my' 또는 'search'
  const [typePath, setTypePath] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>(type);
  const navigate = useNavigate();

  const { text, handleChange } = useSearchForm();

  useEffect(() => { // typePath는 서버에 데이터를 요청할 때 사용
    setSelectedTab(type);
    switch (type) {
      case 'all':
        setTypePath('');
        break;
      case 'my':
        setTypePath('/me');
        break;
      case 'search':
        setTypePath(`/search/${text}`);
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <div className={styles.container}>
      <div className={styles['menu-box']}>
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
              onChange={handleChange}
              text={text}
              onLensIconClick={() => navigate(`/inquiry/search/${text}`)}
            />
          </div>

          <div className={styles['data-table']}>
            <DataTable
              className={styles['data-table__item']}
              typePath={typePath}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
