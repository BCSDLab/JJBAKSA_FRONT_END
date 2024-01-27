import Datatable from 'components/DataTable';
import usePostList from 'pages/Post/hooks/usePostList';

import styles from './Notice.module.scss';

export default function Notice(): JSX.Element {
  const { flatData: postData } = usePostList({ size: 10 });
  const title = '공지사항';
  const subtitle = '쩝쩝박사가 여러분들께 전달드립니다!';

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {postData
          && (
            <Datatable
              data={postData.content}
              title={title}
              subtitle={subtitle}
            />
          )}
      </div>
    </div>
  );
}
