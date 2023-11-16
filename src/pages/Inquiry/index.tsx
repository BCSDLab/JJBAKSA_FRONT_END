import { ReactComponent as Write } from 'assets/svg/inquiry/write.svg';
import usePostList from 'pages/Post/hooks/usePostList';
import { useState } from 'react';
import Pagination from 'components/Pagination';
import Datatable from 'components/DataTable';
import MyInquiry from 'components/MyInquiry';
import styles from './Inquiry.module.scss';

export default function Inquiry(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data: postData } = usePostList(page);
  const title = '문의하기';
  const subTitle = '쩝쩝박사에게 궁금한 점이 있나요?';

  return (
    <div>
      <div className={styles.container}>
        <div>
          <Datatable
            data={postData.content}
            title={title}
            subTitle={subTitle}
            TableTopButton={MyInquiry}
          />
          <Pagination
            totalPage={postData.totalPages}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
      <nav className={styles.nav}>
        <div className={styles['nav__search-block']}>
          <input placeholder="제목 혹은 작성자를 검색해보세요!" className={styles.nav__input} />
          <input type="submit" value="찾기" className={styles.nav__button} />
        </div>
        <div className={styles['nav__post-button']}>
          <div className={styles.nav__post}>
            글쓰기
          </div>
          <div className={styles['nav__post-svg']}>
            <Write />
          </div>
        </div>
      </nav>
    </div>
  );
}
