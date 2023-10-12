import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as WriteIcon } from 'assets/svg/inquiry/write.svg';
import { ReactComponent as Dot } from 'assets/svg/inquiry/dot.svg';
import SearchInput from 'pages/Inquiry/Inquiry/components/SearchBar/SearchInput';
import DataTable from 'pages/Inquiry/Inquiry/components/DataTable/DataTable';
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

interface NavigationLink {
  path: string;
  text: string;
  isSelected: boolean;
  onClick: () => void;
}

function createNavigationLink(link: NavigationLink) {
  const {
    path, text, isSelected, onClick,
  } = link;

  return (
    <div
      className={isSelected ? styles.selected : ''}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      role="button"
      tabIndex={0}
    >
      {isSelected ? <Dot className={styles.dot} /> : null}
      <Link to={path} className={`${styles['link-no-underline']} ${isSelected ? styles.selected : ''}`}>
        {text}
      </Link>
    </div>
  );
}

export default function Inquiry(): JSX.Element {
  const { pathname } = useLocation();
  const pathParts = pathname.split('/');
  const type = pathParts[2]; // 'all' 또는 'my' 또는 'search'
  const [typePath, setTypePath] = useState<string>('');
  const [selectedTab, setSelectedTab] = useState<string>(type);
  const navigate = useNavigate();

  const { text, handleChange } = useSearchForm();
  const title = '문의하기';
  const allInquiryLinkTitle = '전체 문의 내역';
  const myInquiryLinkTitle = '나의 문의 내역';
  const inquireLinkTitle = '문의하러 가기';

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
        <div className={styles['nav__side-navigation']}>
          <div
            className={styles.nav__title}
            onClick={() => {
              navigate('/inquiry/all');
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/inquiry/all');
              }
            }}
            role="button"
            tabIndex={0}
          >
            {title}
          </div>

          <div className={styles.nav__link}>
            {createNavigationLink({
              path: '/inquiry/all',
              text: allInquiryLinkTitle,
              isSelected: selectedTab === 'all',
              onClick: () => navigate('/inquiry/all'),
            })}
            {createNavigationLink({
              path: '/inquiry/my',
              text: myInquiryLinkTitle,
              isSelected: selectedTab === 'my',
              onClick: () => navigate('/inquiry/my'),
            })}
          </div>

          <button
            type="button"
            className={styles['nav__link-inquire']}
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
            <span>
              {inquireLinkTitle}
            </span>
            <span>
              <WriteIcon />
            </span>
          </button>
        </div>

        <div className={styles.searchData}>
          <div className={styles.searchBar}>
            <SearchInput
              onChange={handleChange}
              text={text}
              onLensIconClick={() => navigate(`/inquiry/search/${text}`)}
            />
          </div>

          <div className={styles.data}>
            <div className={styles['data__data-table']}>
              <DataTable typePath={typePath} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
