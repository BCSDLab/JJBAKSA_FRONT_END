import { createPortal } from 'react-dom';
import defaultImage from 'assets/images/follow/default-image.png';
import { UseMutateFunction } from 'react-query';
import { AxiosResponse } from 'axios';
import style from './MobileUnfollow.module.scss';

interface Props {
  nickname: string;
  del: UseMutateFunction<AxiosResponse<any, any>, unknown, string, unknown>;
  toggle: () => void;
  account: string;
}

export default function MobileUnfollow({
  nickname, del, toggle, account,
}: Props) {
  const root = document.body;
  return createPortal(
    <div className={style.container}>
      <div className={style.overay} />
      <div className={style.modal}>
        <div className={style.modal__content}>
          <div className={style.modal__notice}>
            <span className={style.modal__nickname}>{nickname}</span>
            님과의
            <br />
            팔로우를 취소할까요?
          </div>
          <img src={defaultImage} alt="프로필" className={style.modal__image} />
          <div>
            <button
              type="button"
              className={style.modal__delete}
              onClick={() => del(account)}
            >
              팔로우 취소
            </button>
            <button
              type="button"
              className={style.modal__cancel}
              onClick={toggle}
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>,
    root,
  );
}
