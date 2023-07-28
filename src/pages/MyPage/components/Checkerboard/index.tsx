import defaultImage from 'assets/images/search/default-image.png';
import DUMMY from '../MyPost/dummy';
import styles from './Checkerboard.module.scss';

type Post = {
  url: string
};
interface CheckerBoardProps {
  posts: Array<Post>
}

export default function CheckerBoard({ posts }:CheckerBoardProps) {
  console.log(posts);
  return (
    <div className={styles.checkerboard}>
      {DUMMY.map(() => <img className={styles.checkerboard__post} src={defaultImage} alt="post" />)}
    </div>
  );
}
