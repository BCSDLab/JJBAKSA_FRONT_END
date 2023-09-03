import { useState, useRef, useEffect } from 'react';
import cn from 'utils/ts/classNames';
import styles from '../Pin.module.scss';

interface Props {
  images:string[];
}
export default function Carousel({ images }:Props) {
  const [count, setCount] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const rightClick = () => {
    setCount(count + 1 < images.length
      ? count + 1 : images.length - 1);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(${(count) * -550}px)`;
    }
  }, [count]);

  useEffect(() => {
    setCount(0);
  }, [images]);

  return (
    <div className={styles.carousel}>
      <button className={styles.carousel__left} onClick={() => setCount(count > 0 ? count - 1 : 0)} type="button">{'<'}</button>
      <div
        className={styles.carousel__container}
        ref={carouselRef}
      >
        {images && images.map((item:string, index:number) => (
          <img key={`${item + index}`} src={item} alt="" className={styles['carousel__container--photo']} />
        ))}
      </div>
      <div className={styles.carousel__index}>
        {images && images.map((item:string, index:number) => (
          <button
            className={cn({
              [styles['carousel__index--dot']]: true,
              [styles['carousel__index--dot--active']]: count === index,
            })}
            key={`${item + index}`}
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
