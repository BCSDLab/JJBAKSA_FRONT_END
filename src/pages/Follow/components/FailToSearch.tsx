import { ReactComponent as Astronaut } from 'assets/svg/follow/search-fail.svg';
import style from './FailToSearch.module.scss';

export default function FailToSearch() {
  return (
    <div className={style.template}>
      <div className={style.content}>
        <p>친구를 찾지 못했어요.</p>
        <p>다시 검색해 볼까요?</p>
        <Astronaut />
      </div>
    </div>

  );
}
