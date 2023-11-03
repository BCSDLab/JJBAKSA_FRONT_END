import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import cn from 'utils/ts/classNames';
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

  /* eslint-disable */
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
  /* eslint-enable */

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.menu}>
          <button
            className={styles.menu__title}
            onClick={() => {
              navigate('/inquiry/all');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/inquiry/all');
              }
            }}
            type="button"
            tabIndex={0}
          >
            문의하기
          </button>

          <div className={styles.menu__select}>
            <InquirySelectButton
              name="all"
              path="/inquiry/all"
              text="전체 문의 내역"
              isSelected={selectedTab === 'all'}
            />
            <InquirySelectButton
              name="my"
              path="/inquiry/my"
              text="나의 문의 내역"
              isSelected={selectedTab === 'my'}
            />
          </div>

          <button
            className={styles.menu__inquire}
            type="button"
            onClick={() => {
              navigate('/inquiry/inquire');
            }}
            // onClick={() => navigate('/signup', { state: { termsCheck: true } })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/inquiry/inquire');
              }
            }}
            tabIndex={0}
          >
            문의하러 가기
            <WriteIcon />
          </button>
        </div>

        <div className={styles.data}>
          <div className={styles['data__search-bar']}>
            <div className={styles['data__search-bar--component']}>
              <SearchBar
                onChange={handleChange}
                text={text}
                onLensIconClick={() => navigate(`/inquiry/search/${text}`)}
              />
            </div>
          </div>

          <div className={styles['data__data-table']}>
            <div className={styles['data__data-table--component']}>
              <DataTable typePath={typePath} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
