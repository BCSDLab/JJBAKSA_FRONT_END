import defaultImage from 'assets/images/follow/default-image.png';
import { useEffect, useState } from 'react';
import { ReactComponent as Remove } from 'assets/svg/follow/user-remove.svg';
import cn from 'utils/ts/classNames';
import { ReactComponent as Checkerboard } from 'assets/svg/follow/checkerboard.svg';
import { ReactComponent as ClickedCheckerboard } from 'assets/svg/follow/checkerboard-click.svg';
import { ReactComponent as List } from 'assets/svg/follow/list.svg';
import { ReactComponent as ClickedList } from 'assets/svg/follow/list-click.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Add } from 'assets/svg/follow/user-add.svg';
import style from './FollowProfile.module.scss';
import FollowReview from './FollowReview';
import useDeleteFollow from '../hooks/useDeleteFollow';
import useRequestAndUpdate from '../hooks/useRequestAndUpdate';
import useGetFollowerReview from '../hooks/useGetFollowerReview';

const useDeleteState = () => {
  const [canDelete, setCanDelete] = useState(true);
  const { del, data: deletedUser } = useDeleteFollow();

  useEffect(() => {
    if (deletedUser && deletedUser.status >= 200 && deletedUser.status <= 299) {
      setCanDelete((prev) => !prev);
    }
  }, [deletedUser]);

  return { del, canDelete, deletedUser };
};

export default function FollowProfile() {
  const location = useLocation();
  const state = location.state as {
    followId: number, nickname: string, account: string, followedType: string
  };
  const { data } = useGetFollowerReview(state.followId);
  const [isCheckerboard, setIsCheckerboard, setIsList] = useBooleanState(true);
  const { isMobile } = useMediaQuery();
  const { del, canDelete } = useDeleteState();
  const request = useRequestAndUpdate();
  // const count = useGetFollowerReviewCount(state.followId);

  useEffect(() => {
    if (isMobile) setIsList();
  });

  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.user}>
          <img alt="img" src={defaultImage} className={style.user__profile} />
          <div className={style.user__container}>
            <div className={style.user__info}>
              <div>
                <span className={cn({ [style['user__info--span']]: true })}>{state.nickname}</span>
              </div>
              <span>
                @
                {state.account}
              </span>
            </div>
            <button
              type="button"
              className={style.user__button}
              onClick={() => (canDelete && del(state.account))
                || (!canDelete && request(state.account))}
            >
              {canDelete
                ? <Remove className={style.user__svg} />
                : <Add className={style.user__svg} />}
            </button>
          </div>
        </div>
        <div className={style.set}>리뷰</div>
      </div>
      <div className={style.type}>
        <button type="button" onClick={() => setIsCheckerboard()} className={style.type__button}>
          {isCheckerboard ? <ClickedCheckerboard /> : <Checkerboard />}
        </button>
        <button type="button" onClick={() => setIsList()} className={style.type__button}>
          {!isCheckerboard ? <ClickedList /> : <List />}
        </button>
      </div>
      <div className={style.content}>
        <div className={isCheckerboard ? style.review : style.review__list}>
          {data && data.content.map(
            (item) => (
              <FollowReview
                key={item.shopId}
                placeId={item.placeId}
                name={item.name}
                photos={item.photos?.[0]}
                category={item.category}
                isCheckerboard={isCheckerboard}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
