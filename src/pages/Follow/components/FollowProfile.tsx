import defaultImage from 'assets/images/follow/default-image.png';
import { useEffect, useState } from 'react';
import { ReactComponent as Remove } from 'assets/svg/follow/user-remove.svg';
import cn from 'utils/ts/classNames';
import { useInfiniteQuery } from 'react-query';
import { getFollowReview } from 'api/follow';
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
import { useDeleteFollow, useRequestAndUpdate } from './Follower';

const useGetFollowerReview = (id: number) => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['review', id],
    ({ pageParam = '' }) => getFollowReview(id, pageParam),
    {
      getNextPageParam: (last) => {
        const len = last.data.content.length;
        if (last.data.empty) return null;
        // cursor: 마지막으로 조회한 상점 id
        return `cursor=${last.data.content[len - 1].shopId}`;
      },
    },
  );
  const flatData = {
    content: data ? data.pages.flatMap((page) => page.data.content) : [],
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop
        > document.body.scrollHeight - 2) {
        if (hasNextPage) fetchNextPage();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);
  return { data: flatData };
};

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
  const { del, canDelete, deletedUser } = useDeleteState();
  const request = useRequestAndUpdate();
  console.log(deletedUser);
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
                <span>count</span>
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
