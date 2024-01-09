import { useNavigate } from 'react-router-dom';

import PreviousBar from 'pages/Notice/component/PreviousBar';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cn from 'utils/ts/classNames';

import styles from './DataTable.module.scss';

interface Props {
  data: {
    title: string;
    createdAt: string;
    id: number;
  }[];
  title: string;
  subTitle: string;
}

export default function DataTable({
  data, title, subTitle,
}: Props): JSX.Element {
  const { isMobile } = useMediaQuery();
  const nav = useNavigate();
  return (
    <>
      {isMobile ? <PreviousBar />
        : (
          <header className={styles.header}>
            <h1 className={styles.header__title}>{title}</h1>
            <h3 className={styles['header__sub-title']}>{subTitle}</h3>
          </header>
        )}
      <div className={styles.body} />
      <div className={styles.body__content}>
        {data.map((res) => (
          <div key={res.title} className={styles.body__list}>
            <button type="button" className={cn({ [styles['body__list--title']]: true })} onClick={() => nav(`${res.id}`)}>
              {res.title}
            </button>
            <div className={cn({ [styles['body__list--date']]: true })}>
              {res.createdAt}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
