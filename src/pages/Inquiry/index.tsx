import { ReactComponent as Write } from 'assets/svg/inquiry/write.svg';
import { ReactComponent as Move } from 'assets/svg/inquiry/myinquiry.svg';
import usePostList from 'pages/Post/hooks/usePostList';
import { useState } from 'react';
import styles from './Inquiry.module.scss';
import Pagination from './pagination';

export default function Inquiry(): JSX.Element {
  const [page, setPage] = useState(1);
  const { data: postData } = usePostList(page);

  return (
    <div>
      <div className={styles.container}>
        <header className={styles.header}>
          <div>
            <h1 className={styles.header__title}>문의하기</h1>
            <h3 className={styles['header__sub-title']}>쩝쩝박사에게 궁금한 점이 있나요?</h3>
          </div>
          <div className={styles['header__my-inquiry']}>
            나의 문의 바로가기
            <div className={styles.header__move}>
              <Move />
            </div>
          </div>
        </header>
        <div className={styles.boxBody}>
          <div className={styles.box}>
            <div>NO</div>
            <div>TITLE</div>
            <div>NAME</div>
            <div>DATE</div>
            <div>HIT</div>
          </div>
        </div>
        <div>
          {postData && postData.content.map((res) => (
            <div className={styles.inquiryListBox}>
              <div key={res.content} className={styles.nobox}>
                {res.content}
              </div>
              <div key={res.title} className={styles.nobox}>
                {res.title}
              </div>
              <div key={res.boardType} className={styles.nobox}>
                {res.boardType}
              </div>
              <div key={res.createdAt} className={styles.nobox}>
                {res.createdAt}
              </div>
              <div key={res.content} className={styles.nobox}>
                {res.content}
              </div>
            </div>
          ))}
        </div>
      </div>
      {
        postData?.totalPages
        && (
        <Pagination
          totalPage={postData.totalPages}
          setPage={setPage}
          page={page}
        />
        )
      }
      <div className={styles.footer}>
        <div className={styles['footer__search-block']}>
          <input placeholder="제목 혹은 작성자를 검색해보세요!" className={styles.footer__search} />
          <input type="submit" value="찾기" className={styles['footer__search-button']} />
        </div>
        <div className={styles['footer__post-button']}>
          <div className={styles['footer__post-input']}>
            글쓰기
          </div>
          <div className={styles['footer__post-svg']}>
            <Write />
          </div>
        </div>
      </div>
    </div>
  );
}
