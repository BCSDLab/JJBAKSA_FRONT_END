import { ReactComponent as Rating } from 'assets/svg/follow/rate.svg';
import style from './ListReview.module.scss';

interface Props {
  createdAt: string;
  content: string;
  rate: number;
}

export default function ListReview({ createdAt, content, rate }: Props) {
  return (
    <div className={style.container}>
      {content}
      <div>
        {createdAt}
        {' | '}
        <Rating />
        {rate}
        .0
      </div>
    </div>
  );
}
