import { ReactComponent as ArrowLeft } from 'assets/svg/inquiry/arrow-left.svg';
import { ReactComponent as ArrowRight } from 'assets/svg/inquiry/arrow-right.svg';
import { ReactComponent as DoubleArrowLeft } from 'assets/svg/inquiry/double-arrow-left.svg';
import { ReactComponent as DoubleArrowRight } from 'assets/svg/inquiry/double-arrow-right.svg';
import cn from 'utils/ts/classNames';

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
  const pageList = [...Array(totalPage)]
    .map((_, index) => index + 1)
    .slice(Math.min(Math.max(page - 3, 0), totalPage - 5), totalPage)
    .slice(0, 5);

  return (
    <nav className={styles.pagination}>
      <button type="button" className={styles.pagination__svg} onClick={() => movePage(-10)} aria-label="처음 페이지">
        <DoubleArrowLeft />
      </button>
      <button type="button" className={styles.pagination__svg} onClick={() => movePage(-1)} aria-label="이전 페이지로 건너뛰기">
        <ArrowLeft />
      </button>
      {pageList.map((item) => (
        <button
          type="button"
          key={item}
          className={cn({
            [styles.pagination__page]: true,
            [styles['pagination__page--active']]: item === page,
          })}
          onClick={() => setPage(item)}
        >
          {item}
        </button>
      ))}
      <button type="button" className={styles.pagination__svg} onClick={() => movePage(1)} aria-label="다음 페이지">
        <ArrowRight />
      </button>
      <button type="button" className={styles.pagination__svg} onClick={() => movePage(10)} aria-label="이후 페이지로 건너 뛰기">
        <DoubleArrowRight />
      </button>
    </nav>
  );
}
