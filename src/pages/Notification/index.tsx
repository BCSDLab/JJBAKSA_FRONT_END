import usePostList from 'pages/Post/hooks/usePostList';
import { useState } from 'react';
import Pagination from 'components/Pagination';
import Datatable from 'pages/Inquiry/datatable';
import styles from './Notification.module.scss';

export default function Notification(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data: postData } = usePostList(page);
  const title = '공지사항';
  const titleMessage = '쩝쩝박사가 여러분들께 전달드립니다!';

  return (
    <div>
      <div className={styles.container}>
        {
          postData && (
            <div>
              <Datatable
                data={postData.content}
                title={title}
                titleMessage={titleMessage}
              />
              <Pagination
                totalPage={postData.totalPages}
                setPage={setPage}
                page={page}
              />
            </div>
          )
        }
      </div>
      <nav className={styles.nav}>
        <div className={styles['nav__search-block']}>
          <input placeholder="제목 혹은 작성자를 검색해보세요!" className={styles.nav__input} />
          <input type="submit" value="찾기" className={styles.nav__button} />
        </div>
      </nav>
    </div>
  );
}
