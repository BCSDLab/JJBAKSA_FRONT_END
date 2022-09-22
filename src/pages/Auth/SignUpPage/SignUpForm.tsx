import React from 'react';
import { useForm, UseFormRegister, Path } from 'react-hook-form';
import cn from 'utils/ts/classNames';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.scss';
import domain from './static/domain';

interface ISignUpValue {
  id: string | number;
  email: string | number;
  password: string | number;
  ['password-check']: string | number;
}

interface ISignUpProps {
  label: Path<ISignUpValue>;
  labelName: string;
  placeholder: string;
  register: UseFormRegister<ISignUpValue>
  required: string;
}

function Input({
  label, labelName, placeholder, register, required,
}: ISignUpProps): any {
  return (
    <>
      <div className={styles['sign-up-form__label']}>{labelName}</div>
      <input
        placeholder={placeholder}
        className={cn({
          [styles['sign-up-form__input']]: true,
          [styles['sign-up-form__input--id']]: label === 'id',
          [styles['sign-up-form__input--email']]: label === 'email',
        })}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...register(label, { required })}
      />
    </>
  );
}

const Select = React.forwardRef<
HTMLSelectElement,
& ReturnType<UseFormRegister<ISignUpValue>>
>(({
  onChange, onBlur, name,
}, ref) => (
  <select className={styles['sign-up-form__select']} name={name} ref={ref} onChange={onChange} onBlur={onBlur}>
    {domain.map((res) => (
      <option key={res.key} className={styles['sign-up-form__option']} value={res.name}>{res.address}</option>
    ))}
  </select>
));

export default function SignUpForm() {
  const { register } = useForm<ISignUpValue>({ shouldUseNativeValidation: true });
  const navigate = useNavigate();
  return (
    <div className={styles.template}>
      <div className={styles.content}>
        {/* 헤더 */}
        <div>쩝쩝박사</div>
        <div className={styles['sign-up-form']}>
          <div className={styles['sign-up-form__title']}>
            회원가입
          </div>
        </div>
        <div className={styles['sign-up-form__form']}>
          <Input label="id" labelName="아이디" placeholder="아이디를 입력하세요" register={register} required="true" />
          <button type="button" className={styles['sign-up-form__button']}>중복 확인</button>
        </div>
        <div className={styles['sign-up-form__form']}>
          <Input label="email" labelName="이메일" placeholder="이메일을 입력하세요" register={register} required="true" />
          <div className={styles['sign-up-form__email-sign']}>@</div>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <Select {...register('email')} />
        </div>
        <div className={styles['sign-up-form__form']}>
          <Input label="password" labelName="비밀번호" placeholder="비밀번호를 입력하세요" register={register} required="true" />
        </div>
        <div className={styles['sign-up-form__form']}>
          <Input label="password-check" labelName="비밀번호 확인" placeholder="비밀번호를 다시 입력하세요" register={register} required="true" />
        </div>
        <button
          type="button"
          className={cn({
            [styles.content__button]: true,
            [styles['content__button--active']]: true,
          })}
          onClick={() => navigate('/')}
        >
          다음

        </button>
      </div>
    </div>
  );
}
