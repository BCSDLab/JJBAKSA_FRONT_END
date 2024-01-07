import { useInfiniteQuery } from '@tanstack/react-query';

import { getDetailReview } from 'api/follow';
import { ReactComponent as Arrow } from 'assets/svg/common/arrow.svg';
import ListReview from 'pages/Follow/components/ListReview';
import useBooleanState from 'utils/hooks/useBooleanState';
import cn from 'utils/ts/classNames';

import styles from './FollowReview.module.scss';

interface Props {
  placeId: string;
  name: string;
  category: string;
}

const useGetDetailReview = (placeId: string, followerId: number) => {
  const { data } = useInfiniteQuery(
    {
      queryKey: ['detail', placeId],
      initialPageParam: '',
      queryFn: () => getDetailReview(followerId, placeId),
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
  placeId, name, category,
}: Props) {
  const { data } = useGetDetailReview(placeId, 361);
  const [isShow, , , toggle] = useBooleanState(false);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {data
            && (
              <button type="button" onClick={toggle} className={styles.title}>
                <div>
                  <span className={styles.title__name}>{name}</span>
                  <span className={styles.title__category}>{category}</span>
                </div>
                <Arrow className={cn(
                  {
                    [styles.title__arrow]: true,
                    [styles['title__arrow--up']]: isShow,
                  },
                )}
                />
              </button>
            )}
        {data && isShow
            && data.content.map((item) => (
              <ListReview
                createdAt={item.createdAt}
                content={item.content}
                rate={item.rate}
              />
            ))}
      </div>
    </div>
  );
}
