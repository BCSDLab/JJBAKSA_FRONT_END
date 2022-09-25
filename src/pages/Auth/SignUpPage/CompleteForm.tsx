import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as CelebrateIcon } from 'assets/svg/celebrate.svg';
import styles from './Complete.module.scss';

export default function CompleteForm() {
  const { register, handleSubmit, watch } = useForm();
  // nickname api 연결
  const onSubmit = (data: any) => console.log(data);
  const navigate = useNavigate();
  const nicknameValue = watch('nickname');
  console.log(watch('nickname'));

  return (
    <div className={styles.template}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* 헤더 */}
        <div>쩝쩝박사</div>
        <CelebrateIcon className={styles.form__icon} />
        <div className={styles.form__text}>
          {'회원가입을 축하합니다!\n당신을 어떻게 부르면 좋을까요?'}
        </div>
        <input
          className={styles.form__input}
          placeholder="닉네임을 입력해주세요"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register('nickname', { required: true })}
        />
        <button
          type="submit"
          className={
              styles.form__button
            }
          onClick={() => navigate('/')}
          disabled={nicknameValue === undefined || nicknameValue === ''}
        >
          완료
        </button>
      </form>
    </div>
  );
}
