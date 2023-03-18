import style from './FailToSearch.module.scss';

export default function FailToSearch() {
  return (
    <div className={style.template}>
      <div className={style.content}>
        해당 아이디/닉네임을 가진 친구를 찾을 수 없습니다.
      </div>
    </div>

  );
}
