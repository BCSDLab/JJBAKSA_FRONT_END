import defaultImage from 'assets/images/follow/default-image.png';
import plus from 'assets/svg/mypage/plus.svg';
import { toast } from 'react-toastify';
import { useState } from 'react';
import useChangeProfile from 'pages/MyPage/hooks/useChangeProfile';
import styles from './ProfileModal.module.scss';

interface ProfileModalProps {
  imgUrl:string | undefined
}

export default function ProfileModal({ imgUrl }:ProfileModalProps) {
  const [nameLength, setName] = useState(7);
  const changeName = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 10) {
      setName(e.target.value.length);
    }
  };
  const closeModal = () => {
    toast.dismiss();
  };
  const {
    onChange, onClick, previewUrl,
  } = useChangeProfile();
  return (
    <div>
      <span className={styles.phrase}>
        이병건이올씨다님,
        <br />
        프로필을 변경하시겠어요?
      </span>
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
          <input type="text" defaultValue="이병건이올씨다" placeholder="유저이름" onChange={(e) => changeName(e)} className={styles.name__input} maxLength={10} />
          <span className={styles.name__length}>{`${nameLength}/10`}</span>
        </div>
        <div className={styles.form__buttons}>
          <button type="button" onClick={closeModal} className={styles['form__buttons--cancle']}>취소</button>
          <button type="submit" className={styles['form__buttons--complete']}>완료</button>
        </div>
      </form>
    </div>
  );
}
