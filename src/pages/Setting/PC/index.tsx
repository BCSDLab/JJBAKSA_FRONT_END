import { useState } from 'react';
import cn from 'utils/ts/classNames';
import Copyright from 'components/Auth/Copyright';
import ManageAccount from './ManageAccount';
import Service from './Service';
import style from './index.module.scss';

export default function PcSetting() {
  const [isAccount, setIsAccount] = useState(true);
  return (
    <div className={style.container}>
      <div className={style.setting}>
        <div className={style.setting__title}>설정</div>
        <div className={style.selectContainer}>
          <div className={style.select}>
            <div className={cn({
              [style.select__mark]: true,
              [style['select__mark--appear']]: isAccount,
            })}
            />
            <button
              className={cn({
                [style.select__button]: true,
                [style['select__button--selected']]: isAccount,
              })}
              type="button"
              onClick={() => setIsAccount(true)}
            >
              계정관리

            </button>
          </div>
          <div className={style.select}>
            <div className={cn({
              [style.select__mark]: true,
              [style['select__mark--appear']]: !isAccount,
            })}
            />
            <button
              className={cn({
                [style.select__button]: true,
                [style['select__button--selected']]: !isAccount,
              })}
              type="button"
              onClick={() => setIsAccount(false)}
            >
              서비스

            </button>
          </div>
        </div>
      </div>
      {isAccount ? <ManageAccount /> : <Service />}
      <div className={style.copyright}>
        <Copyright />
      </div>
    </div>
  );
}
