import TextEditor from 'components/TextEditor';
import styles from './Post.module.scss';

function Post() {
  return (
    <div className={styles.post}>
      <TextEditor shop={undefined} />
    </div>
  );
}

export default Post;
