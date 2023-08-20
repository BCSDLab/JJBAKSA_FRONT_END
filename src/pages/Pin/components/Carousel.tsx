import { useState, useRef, useEffect } from 'react';
import styles from '../Pin.module.scss';

interface Props {
  images: string[];
}

export default function Carousel({ images }: Props) {
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

  return (
    <div className={styles.carousel}>
      <button className={styles.carousel__left} onClick={() => setCount(count > 0 ? count - 1 : 0)} type="button">{'<'}</button>
      <div
        className={styles.carousel__container}
        ref={carouselRef}
      >
        {images.map((item:string) => (
          <img src={item} alt="" className={styles['carousel__container--photo']} />
        ))}
      </div>
      <button type="button" onClick={() => rightClick()} className={styles.carousel__right}>{'>'}</button>
    </div>
  );
}
