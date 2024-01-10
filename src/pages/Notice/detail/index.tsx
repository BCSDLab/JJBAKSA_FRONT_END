import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import { getPostContent } from 'api/Post';
import styles from 'pages/Notice/detail/Detail.module.scss';
import useMediaQuery from 'utils/hooks/useMediaQuery';

import PreviousBar from '../component/PreviousBar';

const useGetPostContent = (id: string | undefined) => {
  const { data } = useQuery({ queryKey: [id], queryFn: () => getPostContent({ id }) });
  return data;
};

export default function Detail() {
  const { isMobile } = useMediaQuery();
  const params = useParams();
  const data = useGetPostContent(params && params.id);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {isMobile ? (
          <>
            <PreviousBar />
            <header className={styles.top}>
              <div className={styles.header__date}>{data && data.data.createdAt}</div>
              <div className={styles.header__title}>{data && data.data.title}</div>
            </header>
          </>
        )
          : (
            <header className={styles.header}>
              <div className={styles.header__title}>{data && data.data.title}</div>
              <div className={styles.header__date}>{data && data.data.createdAt}</div>
            </header>
          )}
        <div className={styles.detail}>{data && data.data.content}</div>
      </div>
    </div>
  );
}
