import TextEditor from 'components/editor/TextEditor';
import styles from './Post.module.scss';

function Post() {
  return (
    <div className={styles.post}>
      <TextEditor shop={null} />
    </div>
  );
}

export default Post;
