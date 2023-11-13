import { useState, useRef, useEffect } from 'react';
import cn from 'utils/ts/classNames';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import styles from '../Pin.module.scss';

interface Props {
  images:string[];
}

export default function Carousel({ images }:Props) {
  const { isMobile } = useMediaQuery();
  const [count, setCount] = useState<number>(0);

  const carouselRef = useRef<HTMLDivElement>(null);
  const rightClick = () => {
    setCount(count + 1 < images.length
      ? count + 1 : images.length - 1);
  };

  useEffect(() => {
    if (carouselRef.current && !isMobile) {
      carouselRef.current.style.transform = `translateX(${(count) * -550}px)`;
    }

    if (carouselRef.current && isMobile) {
      carouselRef.current.style.transform = `translateX(${(count) * -window.innerWidth}px)`;
    }
  }, [count, isMobile]);

  return (
    <div className={styles.carousel}>
      <button className={styles.carousel__left} onClick={() => setCount(count > 0 ? count - 1 : 0)} type="button">{'<'}</button>
      <div
        className={styles.carousel__container}
        ref={carouselRef}
      >
        {images && images.map((item:string, index:number) => (
          <div className={styles.carousel__image}>
            <img key={`${item + index}`} src={item} alt="" className={styles['carousel__container--photo']} />
          </div>
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
