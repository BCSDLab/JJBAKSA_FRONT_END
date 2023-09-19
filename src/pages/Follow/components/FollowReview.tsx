import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useInfiniteQuery } from 'react-query';
import { getDetailReview } from 'api/follow';
import useBooleanState from 'utils/hooks/useBooleanState';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import cn from 'utils/ts/classNames';
import style from './FollowReview.module.scss';
import ListReview from './ListReview';

interface Props {
  placeId: string;
  name: string;
  photos: string | undefined;
  isCheckerboard: boolean;
  category: string;
}

const useGetDetailReview = (placeId: string, followerId: number) => {
  const { data } = useInfiniteQuery(
    ['detail', placeId],
    ({ pageParam = '' }) => getDetailReview(followerId, placeId, pageParam),
    {
      getNextPageParam: (last) => {
        const len = last.data.content.length;
        if (last.data.empty || last.data.last) return null;
        return `idCursor=${last.data.content[len - 1].id}`;
      },
    },
  );
  const flatData = {
    content: data ? data.pages.flatMap((page) => page.data.content) : [],
  };
  return { data: flatData };
};

export default function FollowReview({
  placeId, name, photos, isCheckerboard, category,
}: Props) {
  const { isMobile } = useMediaQuery();
  const { data } = useGetDetailReview(placeId, 361);
  const [isShow, , , toggle] = useBooleanState(false);

  return (
    <div className={style.container}>
      {!isMobile && isCheckerboard && photos ? <img alt="shop" src={photos} className={style.review__img} /> : isCheckerboard && <div className={style.review__img}>{name}</div>}
      {!isCheckerboard && (
        <div className={style.content}>
          {data
            && (
              <button type="button" onClick={toggle} className={style.title}>
                <div>
                  <span className={style.title__name}>{name}</span>
                  <span className={style.title__category}>{category}</span>
                </div>
                <Arrow className={cn(
                  {
                    [style.title__arrow]: true,
                    [style['title__arrow--up']]: isShow,
                  },
                )}
                />
              </button>
            )}
          {data && !isCheckerboard && isShow
            && data.content.map((item) => (
              <ListReview
                createdAt={item.createdAt}
                content={item.content}
                rate={item.rate}
              />
            ))}
        </div>
      )}
    </div>
  );
}
