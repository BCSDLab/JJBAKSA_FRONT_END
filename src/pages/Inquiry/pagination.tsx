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
  const backTenPage = () => {
    setPage((prev) => (prev > 10 ? prev - 10 : 1));
  };
  const backOnePage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const nextOnePage = () => {
    setPage((prev) => (prev + 1 <= totalPage ? prev + 1 : totalPage));
  };

  const nextTenPage = () => {
    setPage((prev) => (prev + 10 <= totalPage ? prev + 10 : totalPage));
  };

  return (
    <nav className={styles.pagination}>
      <button type="button" className={styles.pagination__svg} onClick={backTenPage}>
        <DoubleArrowLeft />
      </button>
      <button type="button" className={styles.pagination__svg} onClick={backOnePage}>
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

      <button type="button" className={styles.pagination__svg} onClick={nextOnePage}>
        <ArrowRight />
      </button>
      <button type="button" className={styles.pagination__svg} onClick={nextTenPage}>
        <DoubleArrowRight />
      </button>
    </nav>
  );
}
