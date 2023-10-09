import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as WriteIcon } from 'assets/svg/inquiry/write.svg';
import { ReactComponent as Dot } from 'assets/svg/inquiry/dot.svg';
import { useQueryClient } from 'react-query';
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

export default function Inquiry(): JSX.Element {
  const { type } = useParams(); // 'all' 또는 'my'
  const [selectedTab, setSelectedTab] = useState(type);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    setSelectedTab(type);

    queryClient.invalidateQueries('Inquiry');
  }, [type, queryClient]);

  const { text, handleChange } = useSearchForm();
  const title = '문의하기';
  const allInquiryLinkTitle = '전체 문의 내역';
  const myInquiryLinkTitle = '나의 문의 내역';
  const inquireLinkTitle = '문의하러 가기';

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
            <div
              className={styles['nav__link-allinquiry']}
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
              {selectedTab === 'all' ? <Dot className={styles.dot} /> : null}
              <Link to="/inquiry/all" className={`${styles['link-no-underline']} ${selectedTab === 'all' ? styles.selected : ''}`}>
                {allInquiryLinkTitle}
              </Link>
            </div>

            <div
              className={`${styles['nav__link-myinquiry']} ${selectedTab === 'my' ? styles.selected : ''}`}
              onClick={() => {
                navigate('/inquiry/my');
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/inquiry/my');
                }
              }}
              role="button"
              tabIndex={0}
            >
              {selectedTab === 'my' ? <Dot className={styles.dot} /> : null}
              <Link to="/inquiry/my" className={`${styles['link-no-underline']} ${selectedTab === 'my' ? styles.selected : ''}`}>
                {myInquiryLinkTitle}
              </Link>
            </div>
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
            />
          </div>

          <div className={styles.data}>
            <div className={styles['data__data-table']}>
              <DataTable typePath={type === 'my' ? '/me' : ''} key={type} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
