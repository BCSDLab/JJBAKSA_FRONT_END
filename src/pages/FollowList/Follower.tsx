import defaultImage from 'assets/images/follow/default-image.png';
import { deleteFollower, requestFollow } from 'api/follow';
import cn from 'utils/ts/classNames';
import { useState } from 'react';
import style from './FollowList.module.scss';
import { FollowerInfo } from './entity';

const follow = async (account: string, buttonValue: string, toggle: () => void) => {
  try {
    if (buttonValue === '팔로우') {
      const result = await requestFollow({
        userAccount: account,
      });
      if (result.status >= 200 && result.status < 300) {
        toggle();
      }
    } else {
      const result = await deleteFollower({
        userAccount: account,
      });
      if (result.status >= 200 && result.status < 300) {
        toggle();
      }
    }
  } catch {
    // pass
  }
};

const useButtonValue = () => {
  const [buttonValue, setButtonValue] = useState<string>('팔로우');
  const toggle = () => {
    if (buttonValue === '팔로우') {
      setButtonValue('언팔로우');
    } else if (buttonValue === '언팔로우') {
      setButtonValue('팔로우');
    }
  };

  return { buttonValue, toggle };
};

export default function Follower({
  nickname, account,
}: FollowerInfo) {
  const { buttonValue, toggle } = useButtonValue();
  return (
    <div className={style.follower}>
      <img className={style.follower__image} src={defaultImage} alt="default" />
      <div className={style.follower__content}>
        <p className={cn({ [style['follower__content--font']]: true })}>{nickname}</p>
        <p>{account}</p>
      </div>
      <button
        className={cn({
          [style.follower__button]: buttonValue === '팔로우',
          [style['follower__button--unfollow']]: buttonValue === '언팔로우',
        })}
        type="button"
        onClick={() => follow(account, buttonValue, toggle)}
      >
        {buttonValue}

      </button>
    </div>
  );
}
