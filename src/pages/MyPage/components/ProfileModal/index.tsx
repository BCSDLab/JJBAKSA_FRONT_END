import React, { useState } from 'react';
import { toast } from 'react-toastify';

import defaultImage from 'assets/images/follow/default-image.png';
import plus from 'assets/svg/mypage/plus.svg';
import useChangeNickname from 'pages/MyPage/hooks/useChangeNickname';
import useChangeProfile from 'pages/MyPage/hooks/useChangeProfile';

import styles from './ProfileModal.module.scss';

interface ProfileModalProps {
  imgUrl: string | undefined,
  nickname?: string
}

export default function ProfileModal({ imgUrl, nickname }: ProfileModalProps) {
  const [nameLength, setName] = useState(nickname?.length);
  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setName(e.target.value.length);
    }
  };
  const closeModal = () => {
    toast.dismiss();
  };
  const {
    onChange, onClick: changeProfile, previewUrl,
  } = useChangeProfile();
  const { onClick: changeNickname, nicknameRef } = useChangeNickname();

  const onClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeProfile();
    if (nicknameRef.current) {
      changeNickname(nicknameRef.current.value);
    }
    closeModal();
  };

  return (
    <form className={styles.form} onSubmit={(e) => onClick(e)}>
      <label className={styles.form__upload} htmlFor="profileImageFile">
        <input type="file" accept="image/*" id="profileImageFile" className={styles['form__image-input']} onChange={(e) => onChange(e)} />
        <div className={styles['form__upload--image']}>
          {previewUrl ? <img src={previewUrl} alt="profile" className={styles['form__upload--profile']} />
            : <img src={imgUrl || defaultImage} alt="profile" className={styles['form__upload--profile']} />}
          <img src={plus} alt="add_image" className={styles['form__upload--plus']} />
        </div>
      </label>
      <div className={styles.form__name}>
        <input type="text" defaultValue={nickname} placeholder="유저이름" onChange={(e) => changeName(e)} className={styles.name__input} maxLength={10} ref={nicknameRef} />
        <span className={styles.name__length}>{`${nameLength}/10`}</span>
      </div>
      <div className={styles.form__buttons}>
        <button type="button" onClick={closeModal} className={styles['form__buttons--cancel']}>취소</button>
        <button type="submit" className={styles['form__buttons--complete']}>완료</button>
      </div>
    </form>
  );
}
