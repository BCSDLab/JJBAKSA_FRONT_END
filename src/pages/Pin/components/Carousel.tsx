import { useState, useRef, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import cn from 'utils/ts/classNames';
import { ShopPinResponse } from 'api/search/entity';
import styles from '../Pin.module.scss';

export default function Carousel() {
  const cache = useQueryClient();
  const data = cache.getQueryData<ShopPinResponse>(['pinInfo']);
  const [count, setCount] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const rightClick = () => {
    if (data) {
      setCount(count + 1 < data.photos.length
        ? count + 1 : data.photos.length - 1);
    }
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${(count) * -550}px)`;
    }
  }, [count]);

  return (
    <div className={styles.carousel}>
      <button className={styles.carousel__left} onClick={() => setCount(count > 0 ? count - 1 : 0)} type="button">{'<'}</button>
      <div
        className={styles.carousel__container}
        ref={carouselRef}
      >
        {data && data.photos.map((item:string, index:number) => (
          <img key={`${item + index}`} src={item} alt="" className={styles['carousel__container--photo']} />
        ))}
      </div>
      <div className={styles.carousel__index}>
        {data && data?.photos.map((_, index:number) => (
          <button
            className={cn({
              [styles['carousel__index--dot']]: true,
              [styles['carousel__index--dot--active']]: count === index,
            })}
            type="button"
            onClick={() => setCount(index)}
          >
            <div />
          </button>
        ))}
      </div>
      <div className={styles.carousel__index} />
      <button type="button" onClick={() => rightClick()} className={styles.carousel__right}>{'>'}</button>
    </div>
  );
}
