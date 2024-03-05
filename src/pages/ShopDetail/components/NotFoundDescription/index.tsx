import { ReactComponent as NotFoundIcon } from 'assets/svg/common/not-found.svg';

import styles from './NotFoundDescription.module.scss';

function NotFoundDescription() {
  return (
    <div className={styles.container}>
      <NotFoundIcon />
      <div>아직 등록된 리뷰가 없습니다.</div>
      <div>친구에게 추천해볼까요?</div>
    </div>
  );
}

export default NotFoundDescription;
