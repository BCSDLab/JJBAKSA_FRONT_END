/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';
import { fetchPinShop } from 'api/search';
import { useQueries } from 'react-query';
import { ReactComponent as Star } from 'assets/svg/pin/star.svg';
import { ReactComponent as BookMark } from 'assets/svg/pin/bookmark.svg';
import { ReactComponent as Switch } from 'assets/svg/pin/switch-horizontal.svg';
import { ReactComponent as Report } from 'assets/svg/pin/report.svg';
import {
  followersReview, myReview, latestFollowerReview, latestMyReview,
} from 'api/review';
import cn from 'utils/ts/classNames';
import useBooleanState from 'utils/hooks/useBooleanState';
import styles from './Pin.module.scss';
import Carousel from './components/Carousel';

export default function Pin() {
  const [sortType, setSortType] = useState<string>('createdAt');
  const [mode, Mine, Followers] = useBooleanState(true);
  const queries = useQueries([
    { queryKey: 'pinInfo', queryFn: () => fetchPinShop('ChIJe9073fyefDUR4FggnKorNT4') },
    { queryKey: 'myReview', queryFn: () => myReview({ placeId: 'ChIJe9073fyefDUR4FggnKorNT4', sort: sortType }) },
    { queryKey: 'followersReview', queryFn: () => followersReview({ placeId: 'ChIJe9073fyefDUR4FggnKorNT4', sort: sortType }) },
    { queryKey: 'latestMyReview', queryFn: () => latestMyReview('ChIJe9073fyefDUR4FggnKorNT4') },
    { queryKey: 'latestReview', queryFn: () => latestFollowerReview('ChIJe9073fyefDUR4FggnKorNT4') },
  ]);

  const getRateValue = () => {
    if (queries[0].data?.totalRating
      && queries[0].data?.ratingCount) {
      return Math.floor(queries[0].data?.totalRating
        / queries[0].data?.ratingCount).toFixed(1);
    }
    return 0;
  };

  const handleSortButton = () => {
    if (sortType === 'createdAt') setSortType('rate');
    else setSortType('createdAt');
  };

  return (
    <div className={styles.template}>
      <Carousel />
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
            {getRateValue()}
          </div>
          <div className={styles['shop__detail--latest']}>
            마지막 리뷰
            {' '}
            {queries[3].data?.lastDate?.replaceAll('-', '/')}
          </div>
        </div>
        <button className={styles.shop__bookmark} type="button">
          <BookMark />
          북마크
        </button>
      </div>
      <div className={styles.comment}>
        <div className={styles.comment__mode}>
          <button
            className={cn({
              [styles.comment__button]: true,
              [styles['comment__button--active']]: mode,
            })}
            type="button"
            onClick={Mine}
          >
            내 리뷰
          </button>
          <button
            className={cn({
              [styles.comment__button]: true,
              [styles['comment__button--active']]: !mode,
            })}
            type="button"
            onClick={Followers}
          >
            친구 리뷰
          </button>
        </div>
        <div className={styles.comment__list}>
          <button className={styles['comment__list--switch']} type="button" onClick={handleSortButton}>
            <Switch />
            {sortType === 'createdAt' ? '최신순' : '별점순'}
          </button>
          {mode && queries[1].data?.content.map((item) => (
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
                  {!mode
                  && (
                  <button className={styles.comment__report} type="button">
                    <Report />
                    신고하기
                  </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          {!mode && queries[2].data?.content.map((item) => (
            <div key={item.id}>
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
