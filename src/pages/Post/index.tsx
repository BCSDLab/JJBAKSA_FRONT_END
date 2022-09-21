import TextEditor from 'components/TextEditor';
import styles from './Post.module.scss';

function Post() {
  return (
    <div className={styles.post}>
      <TextEditor isShopname={false} />
    </div>
  );
}

export default Post;
