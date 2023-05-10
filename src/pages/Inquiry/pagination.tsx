import { ReactComponent as ArrowLeft } from 'assets/svg/inquiry/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/svg/inquiry/arrow-right.svg';
import { ReactComponent as DoubleArrowLeft } from 'assets/svg/inquiry/double-arrow-left.svg';
import { ReactComponent as DoubleArrowRight } from 'assets/svg/inquiry/double-arrow-right.svg';
import styles from './pagination.module.scss';

interface Props {
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
}

export default function Pagination({ totalPage, setPage, page }: Props): JSX.Element {
  const movePage = (offset: number) => {
    setPage((prev) => {
      if (prev + offset < 1) return 1;
      if (prev + offset > totalPage) return totalPage;
      return prev + offset;
    });
  };

  return (
    <nav className={styles.pagination}>
      <button type="button" className={styles.pagination__svg} onClick={() => movePage(-10)}>
        <DoubleArrowLeft />
      </button>
      <button type="button" className={styles.pagination__svg} onClick={() => movePage(-1)}>
        <ArrowLeft />
      </button>
      {
          page < 3 ? null : <div className={styles['pagination__sub-page']}>{page - 2}</div>
        }
      {
          page < 2 ? null : <div className={styles['pagination__sub-page']}>{page - 1}</div>
        }
      <div className={styles.pagination__page}>
        {page}
      </div>
      {
          page >= totalPage ? null : <div className={styles['pagination__sub-page']}>{page + 1}</div>
        }
      {
          page + 1 >= totalPage ? null : <div className={styles['pagination__sub-page']}>{page + 2}</div>
        }

      <button type="button" className={styles.pagination__svg} onClick={() => movePage(1)}>
        <ArrowRight />
      </button>
      <button type="button" className={styles.pagination__svg} onClick={() => movePage(10)}>
        <DoubleArrowRight />
      </button>
    </nav>
  );
}
