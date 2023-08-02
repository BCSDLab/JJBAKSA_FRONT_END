import { useState, useEffect } from 'react';
import { fetchShop } from 'api/search';
import styles from './Pin.module.scss';

interface Detail {
  formattedAddress:string;
  formattedPhoneNumber:string;
  name:string;
  openNow:boolean;
  photos:Array<string>;
  todayBusinesshour:string;
}
export default function Pin() {
  const [data, setData] = useState<Detail | null>();
  const [count, setCount] = useState(0);
  useEffect(() => {
    const search = async () => {
      const info = await fetchShop('ChIJe9073fyefDUR4FggnKorNT4');
      setData(info.data);
    };
    search();
  }, []);
  return (
    <div className={styles.template}>
      <div className={styles.container}>
        <div className={styles.carousel}>
          <button className={styles.carousel__left} onClick={() => setCount(0)} type="button">{'<'}</button>
          <div className={styles.carousel__inner}>
            {data?.photos.map((item, index) => (
              <div className={index === count ? styles.carousel__conatainer : styles['carousel__container--ready']} key={item}>
                <img src={item} alt="" className={styles.carousel__photo} />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setCount(count + 1)} className={styles.carousel__right}>{'>'}</button>
        </div>
        <div>
          <div>{data?.name}</div>
          <span>{count}</span>
          <div>
            평점 마지막리뷰
          </div>
        </div>
      </div>
    </div>
  );
}