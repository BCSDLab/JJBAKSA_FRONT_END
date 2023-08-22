import defaultImage from 'assets/images/follow/default-image.png';
import { useEffect } from 'react';
import { ReactComponent as Remove } from 'assets/svg/follow/user-remove.svg';
import cn from 'utils/ts/classNames';
import { useInfiniteQuery } from 'react-query';
import { getFollowReview } from 'api/follow';
import { ReactComponent as Checkerboard } from 'assets/svg/follow/checkerboard.svg';
import { ReactComponent as ClickedCheckerboard } from 'assets/svg/follow/checkerboard-click.svg';
import { ReactComponent as List } from 'assets/svg/follow/list.svg';
import { ReactComponent as ClickedList } from 'assets/svg/follow/list-click.svg';
import useBooleanState from 'utils/hooks/useBooleanState';
import style from './FollowProfile.module.scss';
import FollowReview from './FollowReview';

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
      console.log(window.innerHeight
        + document.documentElement.scrollTop, document.body.scrollHeight - 1);
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

export default function FollowProfile() {
  const { data } = useGetFollowerReview(361);
  const [isCheckerboard, setIsCheckerboard, setIsList] = useBooleanState(true);
  console.log(data);
  return (
    <div className={style.container}>
      <div className={style.top}>
        <div className={style.user}>
          <img alt="img" src={defaultImage} className={style.user__profile} />
          <div className={style.user__info}>
            <div>
              <span className={cn({ [style['user__info--span']]: true })}>nickname</span>
              <span>count</span>
            </div>
            <span>@아이디</span>
          </div>
          <Remove />
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
                isCheckerboard={isCheckerboard}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
