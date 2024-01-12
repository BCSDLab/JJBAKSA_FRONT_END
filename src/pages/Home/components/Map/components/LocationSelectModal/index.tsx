import { useEffect } from 'react';

import { ReactComponent as Point } from 'assets/svg/home/point.svg';
import { ReactComponent as Search } from 'assets/svg/home/search.svg';
import LocationSelectButton from 'pages/Home/components/Map/components/LocationSelectButton';
import useHome from 'pages/Home/components/Map/hooks/useHome';

import styles from './LocationSelectModal.module.scss';

export default function LocationSelectModal({ className }: { className?: string }): JSX.Element {
  const {
    userLocation, isModalOpen, setOpen, setClose,
  } = useHome();

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setClose();
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen, setClose]);

  return (
    <div className={styles[`${className}`]}>
      <div className={styles.container}>
        <LocationSelectButton
          address={userLocation.address}
          onClick={setOpen}
        />

        {isModalOpen && (
          <>
            <div
              className={styles.backdrop}
              role="presentation"
              onClick={setClose}
            />
            <div className={styles.modal}>
              <div className={styles.text}>
                <div className={styles.text__title}>현재 위치가 올바르지 않은가요?</div>
                <div className={styles.text__subtitle}>현재 계신 곳의 위치를 아래 검색창을 통해</div>
                <div className={styles.text__subtitle}>알려주시면 반영하겠습니다.</div>
              </div>
              <div className={styles.search}>
                <div className={styles.search__box}>
                  <Search className={styles.search__icon} />
                  <input
                    type="text"
                    className={styles.search__text}
                    placeholder="지번, 도로명, 건물명으로 검색해주세요."
                  />
                </div>
                <button className={styles.search__button} type="button">등록</button>
              </div>
              <div className={styles.location}>
                <div className={styles.location__active}>
                  <Point className={styles.location__icon} />
                  현재 위치로 설정
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
