import { createPortal } from 'react-dom';

import { UseMutateFunction } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import defaultImage from 'assets/images/follow/default-image.png';

import styles from './MobileUnfollow.module.scss';

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
    <div className={styles.container}>
      <div className={styles.overay} />
      <div className={styles.modal}>
        <div className={styles.modal__content}>
          <div className={styles.modal__notice}>
            <span className={styles.modal__nickname}>{nickname}</span>
            님과의
            <br />
            팔로우를 취소할까요?
          </div>
          <img src={defaultImage} alt="프로필" className={styles.modal__image} />
          <div>
            <button
              type="button"
              className={styles.modal__delete}
              onClick={() => del(account)}
            >
              팔로우 취소
            </button>
            <button
              type="button"
              className={styles.modal__cancel}
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
