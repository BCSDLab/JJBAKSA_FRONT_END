import { useState } from 'react';
import { fetchShop } from 'api/search';
import { useQueries } from 'react-query';
import { followersReview, myReview } from 'api/review';
import styles from './Pin.module.scss';

export default function Pin() {
  const [count, setCount] = useState(0);
  // const [comment, setComment] = useState<Array<Object>>([]);
  const queries = useQueries([
    { queryKey: 'pinInfo', queryFn: () => fetchShop('ChIJe9073fyefDUR4FggnKorNT4') },
    { queryKey: 'myReview', queryFn: () => myReview('ChIJe9073fyefDUR4FggnKorNT4') },
    { queryKey: 'followersReview', queryFn: () => followersReview('ChIJe9073fyefDUR4FggnKorNT4') },
  ]);

  return (
    <div className={styles.template}>
      <div className={styles.container}>
        {queries[0].data?.data.name}
        <div className={styles.carousel}>
          <button className={styles.carousel__left} onClick={() => setCount(0)} type="button">{'<'}</button>
          <div className={styles.carousel__inner}>
            {queries[0].data?.data.photos.map((item:string, index:number) => (
              <div
                className={index === count ? styles.carousel__conatainer
                  : styles['carousel__container--ready']}
                key={item}
              >
                <img src={item} alt="" className={styles.carousel__photo} />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setCount(count + 1)} className={styles.carousel__right}>{'>'}</button>
        </div>
        <div>
          {/* <div>{data?.name}</div> */}
          <span>{count}</span>
          <div>
            평점 마지막리뷰
            {queries[1].data?.data.content.map((data:any) => (
              <div>
                {data.content}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
