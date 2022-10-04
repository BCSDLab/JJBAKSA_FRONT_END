import React from 'react';
import cn from 'utils/ts/classNames';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow.svg';
import styles from '../SignUp.module.scss';
import { DOMAIN } from '../../static/signUp';

import { SignUpFormData } from '../entity';
import useSelect from '../../hooks/useSelect';

export default function DomainDropdown() {
  const { formState: { errors } } = useFormContext<SignUpFormData>();
  const {
    isOpen, selectValue, changeOpenState, selectDomain,
  } = useSelect();

  return (
    <>
      <input
        className={cn({
          [styles.form__select]: true,
          [styles['form__select--error']]: errors?.email !== undefined,
        })}
        placeholder="직접 입력"
        type="text"
        onClick={changeOpenState}
        defaultValue={selectValue}
      />
      <ArrowIcon
        className={cn({
          [styles['form__arrow-icon']]: true,
          [styles['form__arrow-icon--open']]: isOpen,
        })}
        onClick={changeOpenState}
        aria-hidden
      />
      <ol className={cn({
        [styles['form__option-wrap']]: true,
        [styles['form__option-wrap--open']]: isOpen,
      })}
      >
        {DOMAIN.map((res) => (
          <li
            key={res.key}
            className={styles.form__option}
            value={res.name}
            role="presentation"
            onClick={selectDomain}
          >
            {res.address}
          </li>
        ))}
      </ol>
    </>
  );
}
