import defaultImage from 'assets/images/follow/default-image.png';
import { followRequest } from 'api/follow';
import cn from 'utils/ts/classNames';
import { useState } from 'react';
import style from './FollowList.module.scss';
import { Item } from './entity';

const follow = async (account: string) => {
  try {
    const result = await followRequest({
      userAccount: account,
    });
    if (result.status === 200) {
      console.log(result);
    }
  } catch (e) {
    console.log(e);
  }
};

const useButtonValue = () => {
  const [buttonValue, SetButtonValue] = useState<string>('팔로우');
  const setFollow = () => {
    SetButtonValue('팔로우');
  };
  const setUnfollow = () => {
    SetButtonValue('언팔로우');
  };
  return { buttonValue, setFollow, setUnfollow };
};

export default function Follower({
  nickname, account,
}: Item) {
  const { buttonValue } = useButtonValue();
  return (
    <div className={style.follower}>
      <img className={style.follower__image} src={defaultImage} alt="default" />
      <div className={style.follower__content}>
        <p className={cn({ [style['follower__content--font']]: true })}>{nickname}</p>
        <p>{account}</p>
      </div>
      <button className={style.follower__button} type="button" onClick={() => follow(account)}>{buttonValue}</button>
    </div>
  );
}
