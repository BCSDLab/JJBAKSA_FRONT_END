import { Link } from 'react-router-dom';
import { ReactComponent as Move } from 'assets/svg/inquiry/myinquiry.svg';
import styles from './DataTable.module.scss';

interface Props {
  data: {
    title: string;
    content: string;
    boardType: string;
    createdAt: string;
  }[];
  title: string;
  titleMessage: string;
}

export default function DataTable({ data, title, titleMessage }: Props): JSX.Element {
  return (
    <div>
      <header className={styles.header}>
        <div>
          <h1 className={styles.header__title}>{title}</h1>
          <h3 className={styles['header__sub-title']}>{titleMessage}</h3>
        </div>
        {
          title === '문의하기' ? (
            <Link to="/Myinquiry" className={styles.header__link}>
              <div className={styles['header__my-inquiry']}>
                나의 문의 바로가기
                <div className={styles.header__move}>
                  <Move />
                </div>
              </div>
            </Link>
          )
            : null
        }
      </header>
      <div className={styles.body}>
        <div className={styles['body__list-title']}>
          <div>NO</div>
          <div>TITLE</div>
          <div>NAME</div>
          <div>DATE</div>
          <div>HIT</div>
        </div>
      </div>
      <div>
        {data.map((res) => (
          <div key={res.title} className={styles.body__list}>
            <div className={styles.body__element}>
              {res.content}
            </div>
            <div className={styles.body__element}>
              {res.title}
            </div>
            <div className={styles.body__element}>
              {res.boardType}
            </div>
            <div className={styles.body__element}>
              {res.createdAt}
            </div>
            <div className={styles.body__element}>
              {res.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
