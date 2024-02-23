import { useState } from 'react';

import Copyright from 'components/Auth/Copyright';
import ManageAccount from 'pages/Setting/PC/ManageAccount';
import Service from 'pages/Setting/PC/Service';
import cn from 'utils/ts/classNames';

import styles from './PcSetting.module.scss';

export default function PcSetting() {
  const [isAccount, setIsAccount] = useState(true);
  return (
    <div className={styles.container}>
      <div className={styles.setting}>
        <div className={styles.menu}>
          <div className={styles.menu__title}>설정</div>
          <div className={styles['select-container']}>
            <div className={styles.select}>
              <div className={cn({
                [styles.select__mark]: true,
                [styles['select__mark--appear']]: isAccount,
              })}
              />
              <button
                className={cn({
                  [styles.select__button]: true,
                  [styles['select__button--selected']]: isAccount,
                })}
                type="button"
                onClick={() => setIsAccount(true)}
              >
                계정관리
              </button>
            </div>
            <div className={styles.select}>
              <div className={cn({
                [styles.select__mark]: true,
                [styles['select__mark--appear']]: !isAccount,
              })}
              />
              <button
                className={cn({
                  [styles.select__button]: true,
                  [styles['select__button--selected']]: !isAccount,
                })}
                type="button"
                onClick={() => setIsAccount(false)}
              >
                서비스
              </button>
            </div>
          </div>
        </div>

        <div className={styles.content}>
          {isAccount ? <ManageAccount /> : <Service />}
        </div>
      </div>

      <footer className={styles.copyright}>
        <Copyright />
      </footer>
    </div>
  );
}
