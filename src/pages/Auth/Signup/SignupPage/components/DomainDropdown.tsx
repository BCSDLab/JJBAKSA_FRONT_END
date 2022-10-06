import React from 'react';
import cn from 'utils/ts/classNames';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow.svg';
import styles from '../SignUp.module.scss';
import { DOMAIN, ERROR_MESSAGE } from '../../static/signUp';
import { SignUpFormData } from '../entity';
import useDropDown from '../../hooks/useDropdown';
import { EMAILDOMAIN_REGEXP } from '../../static/Regexp';

export default function DomainDropdown() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  const dropdown = useDropDown('직접 입력');

  return (
    <>
      <input
        className={cn({
          [styles.form__select]: true,
          [styles['form__select--error']]:
            errors?.emailDomain !== undefined
            || errors?.email !== undefined,
        })}
        {...register('emailDomain', {
          required: ERROR_MESSAGE.email,
          pattern: {
            value: EMAILDOMAIN_REGEXP,
            message: ERROR_MESSAGE.email,
          },
        })}
        placeholder="직접 입력"
        type="text"
        onClick={dropdown.changeDropdownOpen}
        value={dropdown.selectedValue}
        onChange={dropdown.changeValue}
      />
      <ArrowIcon
        className={cn({
          [styles['form__arrow-icon']]: true,
          [styles['form__arrow-icon--open']]: dropdown.isDropdownOpen,
        })}
        onClick={dropdown.changeDropdownOpen}
        aria-hidden
      />
      <ol
        className={cn({
          [styles['form__option-wrap']]: true,
          [styles['form__option-wrap--open']]: dropdown.isDropdownOpen,
        })}
      >
        {DOMAIN.map((res) => (
          <li
            key={res.key}
            className={styles.form__option}
            value={res.address}
            role="presentation"
            onClick={dropdown.selectDomain}
          >
            {res.address}
          </li>
        ))}
      </ol>
    </>
  );
}
