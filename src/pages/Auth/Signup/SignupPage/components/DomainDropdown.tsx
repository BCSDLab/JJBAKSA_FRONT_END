import React, { useCallback } from 'react';
import cn from 'utils/ts/classNames';
import { useFormContext } from 'react-hook-form';
import { ReactComponent as ArrowIcon } from 'assets/svg/arrow.svg';
import styles from '../SignUp.module.scss';
import { DOMAIN } from '../../static/signUp';
import { SignUpFormData } from '../entity';
import useDropDown from '../../hooks/useDropdown';

export default function DomainDropdown() {
  const {
    formState: { errors },
  } = useFormContext<SignUpFormData>();

  const {
    isDropdownOpen,
    selectedValue,
    changeDropdownOpen,
    select,
    setSelectedValue,
  } = useDropDown();

  const onChangeInput = useCallback((e: any) => {
    setSelectedValue(e.target.value);
  }, [setSelectedValue]);

  const selectDomain = (e: React.MouseEvent<HTMLLIElement>) => {
    if (e.currentTarget.innerText !== '직접 입력') {
      select(e);
    } else {
      setSelectedValue('');
      changeDropdownOpen();
    }
  };

  return (
    <>
      <input
        className={cn({
          [styles.form__select]: true,
          [styles['form__select--error']]: errors?.email !== undefined,
        })}
        placeholder="직접 입력"
        type="text"
        onClick={changeDropdownOpen}
        value={selectedValue}
        onChange={onChangeInput}
      />
      <ArrowIcon
        className={cn({
          [styles['form__arrow-icon']]: true,
          [styles['form__arrow-icon--open']]: isDropdownOpen,
        })}
        onClick={changeDropdownOpen}
        aria-hidden
      />
      <ol
        className={cn({
          [styles['form__option-wrap']]: true,
          [styles['form__option-wrap--open']]: isDropdownOpen,
        })}
      >
        {DOMAIN.map((res) => (
          <li
            key={res.key}
            className={styles.form__option}
            value={res.address}
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
