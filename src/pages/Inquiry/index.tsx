import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as WriteIcon } from 'assets/svg/inquiry/write.svg';
import useInquiryList from 'pages/Inquiry/hooks/useInquiryList';
import SearchInput from './components/SearchBar/SearchInput';
import Pagination from './components/Pagination';
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
  const [page, setPage] = useState(1);
  const { data: inquiryData } = useInquiryList(null, 0);
  const [selectedTab, setSelectedTab] = useState('all');
  const title = '문의하기';
  const inquireLinkTitle = '문의하러 가기';

  function handleModClick(mod: string) {
    setSelectedTab(mod);
  }

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles['nav__side-navigation']}>
          <h1 className={styles.nav__title}>{title}</h1>

          <div className={styles['nav__mod-items']}>
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
              className={`${styles['nav__mod-myinquiries']} ${selectedTab === 'my' ? 'selected' : ''}`}
              onClick={() => handleModClick('my')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleModClick('my');
                }
              }}
              role="button"
              tabIndex={0}
            >
              <Link to="/myinquiry" className={styles.link}>
                <div className={styles.title}>
                  나의 문의 내역
                </div>
              </Link>
            </div>
          </div>

          <button
            type="button"
            className={styles.nav__inquire}
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

        <div className={styles['main__search-and-data']}>
          <div className={styles['main__search-bar']}>
            <SearchInput
              onChange={handleChange}
              text={text}
            />
          </div>

          {
            inquiryData && (
              <div className={styles['main__data-table']}>
                <DataTable
                  data={inquiryData.content}
                />
              </div>
            )
          }

          {
            inquiryData && (
              <div className={styles['main__foot-pagination']}>
                <Pagination
                  totalPage={inquiryData.totalPages}
                  setPage={setPage}
                  page={page}
                />
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
}
