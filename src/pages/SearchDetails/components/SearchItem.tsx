import { useNavigate } from 'react-router-dom';

import { Shop } from 'api/shop/entity';
import { ReactComponent as NotFoundImageIcon } from 'assets/svg/shop/not-found.svg';

import styles from '../SearchDetails.module.scss';

interface Props {
  shop: Shop;
  pathname: string;
}

interface RecentParam {
  name: string,
  photoToken: string | null,
  category: string,
  placeId: string
}

const setRecentSearches = ({
  name, photoToken, category, placeId,
}: RecentParam) => {
  // 로컬 스토리지에 최근 검색한 상점 저장
  const recentList = {
    photoToken,
    name,
    category,
    placeId,
  };
  if (localStorage.getItem('recent')) {
    let flag = false;
    const existingRecentList = localStorage.getItem('recent') as string;
    // 왜 string | null로 추론되는지 모르겠음, 일단 타입 단언함
    const parsingResult: {
      photoToken: string,
      name: string,
      category: string,
      placeId: string
    }[] = JSON.parse(existingRecentList);
    Object.values(parsingResult).forEach((value) => {
      if (value.placeId === recentList.placeId) flag = true;
    });
    // 기존에 추가했던 가게가 아니면 그대로 추가
    if (!flag) {
      const obj = [recentList, ...parsingResult];
      localStorage.setItem('recent', JSON.stringify(obj));
    }
    // 기존에 추가했던 가게면 다시 맨 앞으로 끌어옴
    if (flag) {
      const removedList = parsingResult.filter((item) => item.placeId !== recentList.placeId);
      localStorage.setItem('recent', JSON.stringify([recentList, ...removedList]));
    }
  } else {
    // 처음 저장할 때
    localStorage.setItem('recent', JSON.stringify([recentList]));
  }
};
export default function SearchItem({ shop, pathname }: Props) {
  const {
    name, formattedAddress, photoToken, placeId, dist, openNow, category,
  } = shop;

  const navigate = useNavigate();
  const distInKm = (dist / 1000).toFixed(1);
  const onClick = () => {
    setRecentSearches({
      name, photoToken, placeId, category,
    });
    // 음식점 상세 정보로 이동
    const newPath = pathname.includes('/post') ? `/post/${name}` : `/shop/${name}`;
    navigate(newPath, { state: { placeId } });
  };
  return (
    <button
      onClick={onClick}
      type="button"
      className={styles.item}
    >
      <div className={styles.item__content}>
        <section className={styles.item__name}>
          <div className={styles.item__header}>
            <h1 className={styles['item__header--title']}>{name}</h1>
            <h2 className={styles['item__header--category']}>{category}</h2>
          </div>
          <div className={styles.item__header}>
            <h2 className={styles['item__header--address']}>{formattedAddress}</h2>
            <h2 className={styles['item__header--dist']}>{`${distInKm}Km`}</h2>
          </div>
        </section>
        <section className={styles.item__info}>
          <div className={styles.item__status}>
            <span className={styles['item__status--open']}>
              {openNow ? '영업중' : '영업 종료'}
            </span>
          </div>
        </section>
      </div>
      <div className={styles.image}>
        {photoToken ? (
          <img className={styles.image__item} alt="가게 이미지" src={photoToken} />
        ) : (
          <div className={styles.image__empty}>
            <NotFoundImageIcon />
            <div>등록된 사진이 없어요!</div>
          </div>
        )}
      </div>
    </button>
  );
}
