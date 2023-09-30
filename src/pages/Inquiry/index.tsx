import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as WriteIcon } from 'assets/svg/inquiry/write.svg';
import SearchInput from './components/SearchBar/SearchInput';
import DataTable from './components/DataTable/DataTable';
// import MyInquiry from './components/MyInquiry/MyInquiry';
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
  const { text, handleChange } = useSearchForm();
  const [selectedTab, setSelectedTab] = useState('all');
  const title = '문의하기';
  const inquireLinkTitle = '문의하러 가기';

  function handleModClick(mod: string) {
    setSelectedTab(mod);
  }

  // useEffect(() => { // DataTable 스크롤 시 linear-gradient 생성
  //   const dataDiv = document.querySelector('.data');
  //   const dataTable = document.querySelector('.data__data-table');
  //   console.log(dataDiv);
  //   console.log(dataTable);

  //   function handleScroll() {
  //     if (dataDiv) {
  //       if (dataTable && dataTable.scrollTop > 0) {
  //         dataDiv.classList.add('scrolled');
  //       } else {
  //         dataDiv.classList.remove('scrolled');
  //       }
  //     }
  //   }

  //   if (dataTable) {
  //     dataTable.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (dataTable) {
  //       dataTable.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, [inquiryData]);

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles['nav__side-navigation']}>
          <h1 className={styles.nav__title}>{title}</h1>

          <div className={styles['nav__link-inquiry']}>
            <div
              className={`${styles['nav__mod-allinquiries']} ${selectedTab === 'all' ? 'selected' : ''}`}
              onClick={() => handleModClick('all')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleModClick('mod');
                  console.log(selectedTab);
                }
              }}
              role="button"
              tabIndex={0}
            >
              전체 문의 내역
            </div>
            <div
              className={`${styles['nav__link-myinquiry']} ${selectedTab === 'my' ? 'selected' : ''}`}
              onClick={() => handleModClick('my')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleModClick('my');
                }
              }}
              role="button"
              tabIndex={0}
            >
              <Link to="/myinquiry">
                <div>
                  나의 문의 내역
                </div>
              </Link>
            </div>
          </div>

          <button
            type="button"
            className={styles['nav__link-inquire']}
            // onClick={() => navigate('/signup', { state: { termsCheck: true } })}
          >
            <span>
              {inquireLinkTitle}
            </span>
            <span>
              <WriteIcon />
            </span>
          </button>

          {/* <header className={styles.header}>
            {MyInquiry && <MyInquiry />}
          </header> */}
        </div>

        <div className={styles['search-data']}>
          <div className={styles['search-bar']}>
            <SearchInput
              onChange={handleChange}
              text={text}
            />
          </div>

          <div className={styles.data}>
            <div className={styles['data__data-table']}>
              <DataTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
