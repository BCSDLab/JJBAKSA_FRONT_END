import { useState } from 'react';
import { ReactComponent as Star } from 'assets/svg/pin/star.svg';
import { ReactComponent as Switch } from 'assets/svg/pin/switch-horizontal.svg';
import { ReactComponent as Report } from 'assets/svg/pin/report.svg';
import { ReactComponent as Pencil } from 'assets/svg/pin/pencil.svg';
import { ReactComponent as Empty } from 'assets/svg/pin/empty.svg';
import { ReactComponent as FollowersEmpty } from 'assets/svg/pin/follower_empty.svg';
import cn from 'utils/ts/classNames';
import { Link } from 'react-router-dom';
import styles from './Pin.module.scss';
import Carousel from './components/Carousel';
import Scrap from './components/Scrap';
import usePinQueries from './hooks/usePinQueries';

interface Props {
  placeId:string;
}

export default function Pin({ placeId }:Props) {
  const [sortType, setSortType] = useState<string>('createdAt');
  const [mode, setMode] = useState(1);
  const { queries, rateValue } = usePinQueries({ placeId, sortType });

  const handleSortButton = () => {
    if (sortType === 'createdAt') setSortType('rate');
    else setSortType('createdAt');
  };

  return (
    <div className={styles.template}>
      <div>
        <Carousel images={queries[0].data?.photos || []} />
        <div className={styles.shop}>
          <div className={styles.shop__title}>
            <span className={styles['shop__title--name']}>
              {queries[0].data?.name}
            </span>
            <span className={styles['shop__title--category']}>{queries[0].data?.category}</span>
          </div>
          <div className={styles.shop__detail}>
            <div className={styles['shop__detail--rate']}>
              <Star />
              {rateValue}
            </div>
            <div className={styles['shop__detail--latest']}>
              마지막 리뷰
              {' '}
              {(queries[1].data?.lastDate?.replaceAll('-', '/') || '')
                > (queries[2].data?.lastDate?.replaceAll('-', '/') || '')
                ? queries[1].data?.lastDate?.replaceAll('-', '/')
                : queries[2].data?.lastDate?.replaceAll('-', '/')}
            </div>
          </div>
          <Scrap placeId={placeId} />
        </div>
        <div className={styles.comment}>
          <div className={styles.comment__mode}>
            <button
              className={cn({
                [styles.comment__button]: true,
                [styles['comment__button--active']]: mode === 1,
              })}
              type="button"
              onClick={() => setMode(1)}
            >
              내 리뷰
            </button>
            <button
              className={cn({
                [styles.comment__button]: true,
                [styles['comment__button--active']]: mode === 2,
              })}
              type="button"
              onClick={() => setMode(2)}
            >
              친구 리뷰
            </button>
          </div>
          <div className={styles.comment__list}>
            <button className={styles['comment__list--switch']} type="button" onClick={handleSortButton}>
              <Switch />
              {sortType === 'createdAt' ? '최신순' : '별점순'}
            </button>
            {mode === 1 && (queries[3].data?.content.length !== 0
              ? queries[3].data?.content.map((item) => (
                <div className={styles.comment__item} key={item.id}>
                  <div className={styles.comment__info}>
                    <div className={styles.comment__container}>
                      <div className={styles['comment__info--nickname']}>
                        {item.userReviewResponse.nickname}
                      </div>
                      <div className={styles['comment__info--id']}>
                        {item.userReviewResponse.account}
                      </div>
                    </div>
                    <div className={styles['comment__info--content']}>
                      {item.content}
                    </div>
                    <div className={styles['comment__info--evaluation']}>
                      {`${item.createdAt.slice(3).replaceAll('-', '/')}|`}
                      <Star />
                      {item.rate.toFixed(1)}
                    </div>
                  </div>
                </div>
              )) : (
                <div className={styles.comment__empty}>
                  <Empty />
                  <div className={styles['comment__empty--text']}>
                    오늘 다녀오셨나요?
                    {'\n'}
                    리뷰를 한번 작성해보아요!
                  </div>
                </div>
              ))}
            {mode === 2 && (queries[4].data?.content.length !== 0
              ? queries[4].data?.content.map((item) => (
                <div className={styles.comment__item} key={item.id}>
                  <div className={styles['comment__item--profile']}>프로필</div>
                  <div className={styles.comment__info}>
                    <div className={styles.comment__container}>
                      <div className={styles['comment__info--nickname']}>
                        {item.userReviewResponse.nickname}
                      </div>
                      <div className={styles['comment__info--id']}>
                        {item.userReviewResponse.account}
                      </div>
                    </div>
                    <div className={styles['comment__info--content']}>
                      {item.content}
                    </div>
                    <div className={styles['comment__info--evaluation']}>
                      {`${item.createdAt.slice(3).replaceAll('-', '/')}|`}
                      <Star />
                      {item.rate.toFixed(1)}
                      <button className={styles.comment__report} type="button">
                        <Report />
                        신고하기
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className={styles.comment__empty}>
                  <div className={styles['comment__empty--text']}>
                    작성한 리뷰가 없어요.
                  </div>
                  <FollowersEmpty />
                </div>
              ))}
          </div>
          <Link className={styles.comment__write} to="/search " type="button">
            <Pencil className={styles['container__write--icon']} />
            리뷰 작성하기
          </Link>
        </div>
      </div>
    </div>
  );
}
