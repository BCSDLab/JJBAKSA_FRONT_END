import useMediaQuery from 'utils/hooks/useMediaQuery';
import { useInfiniteQuery } from 'react-query';
import { getDetailReview } from 'api/follow';
import style from './FollowReview.module.scss';

interface Props {
  placeId: string;
  name: string;
  photos: string | undefined;
  isCheckerboard: boolean;
}

const useGetDetailReview = (placeId: string, followerId: number) => {
  const { data } = useInfiniteQuery(['detail', placeId], () => getDetailReview(followerId, placeId));
  return { data };
};

export default function FollowReview({
  placeId, name, photos, isCheckerboard,
}: Props) {
  const { isMobile } = useMediaQuery();
  const { data } = useGetDetailReview(placeId, 361);

  return (
    <div className={style.container}>
      {!isMobile && isCheckerboard && photos ? <img alt="shop" src={photos} className={style.review__img} /> : isCheckerboard && <div className={style.review__img}>{name}</div>}
      {data && !isCheckerboard && <div>test</div>}
    </div>
  );
}
