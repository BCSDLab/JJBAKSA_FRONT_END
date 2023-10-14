import { ReactComponent as Rating } from 'assets/svg/follow/rate.svg';
import { ReactComponent as EmptyStar } from 'assets/svg/follow/empty-star.svg';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import style from './ListReview.module.scss';

interface Props {
  createdAt: string;
  content: string;
  rate: number;
}

export default function ListReview({ createdAt, content, rate }: Props) {
  const { isMobile } = useMediaQuery();
  const rateArray = new Array<number>(rate).fill(1);
  const restArray = new Array<number>(5 - rate).fill(1);
  return (
    <div className={style.container}>
      {content}
      <div>
        {createdAt}
        {' | '}
        {isMobile ? (
          <span>
            {rate}
            .0
          </span>
        ) : (
          <span>
            {rateArray.map(() => <Rating />)}
            {restArray.map(() => <EmptyStar />)}
          </span>
        )}
      </div>
    </div>
  );
}
