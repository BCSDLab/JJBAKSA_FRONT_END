import styles from './Inquiry.module.scss';

interface Props {
  data: {
    title: string;
    content: string;
    boardType: string;
    createdAt: string;
  }[];
}

export default function Datatable({ data }: Props): JSX.Element {
  return (
    <div>
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
