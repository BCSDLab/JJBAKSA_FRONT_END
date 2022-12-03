import styles from 'pages/Search/Search.module.scss';
import { ReactComponent as MapIcon } from 'assets/svg/search/map.svg';

interface Props {
  address: string,
  dist: number,
  placeId: string,
  placeName: string,
  score: number,
  shopId: number,
  x: string,
  y: string,
}

interface Shop {
  data: Props
}

const DEFAULT_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAYFBMVEXDw8MAAABwcHDHx8eKioqkpKS8vLzGxsatra3KysqQkJCenp6AgIB3d3dra2u3t7dZWVlMTEyysrIsLCxTU1NDQ0OUlJQhISEyMjJlZWUMDAw9PT2Dg4N0dHQYGBhGRkaaAXj3AAACVklEQVR4nO3a63KiQBBAYbATxxYQbxtNdjd5/7dMIFwEGbaA1Fo05/tpNFVzZJgBCQIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICFEdFJROTRQ5jKxbvVRLF79CCmkW043XbeEeTpBxo8zXs2ZA2i9RSRiQbPUw5l90wDUw2cqIyIYamBHpP9Lho+GEMNNM7P8IfB/8BOg2qbcNaB/8BQg2qt3ww8J5hpkA2kkAwcj50GUdVgN3AymGkQpPW+1zMXfFeHdhror7LBuvt9GsXHzpHaaVAdCC/dw9FddnnYNU0MNXDp4WuUp6j7bCAv3jXDUIPAabo5eia9K46SS9ffDDX44nxbA7kWM2V/f5gYa+CTnwyKVeMuwjIaSL15CMNj+72LaODWt7fNTotsUG8dcq+t2bCEBpq0bqC2dhA2G4ho/cLN1VT3TtJkA00u57R8xQVvdw2ujdlgsYGusnGWEfRwl6B1aWmwQbEQ/v4elf7pSBCGt7cdDTYoF8K/2XftNp0JGqcEew3qhTD7rt27p8FHPRvMNbhZCN/Wge49CcIwqSJYa9BYCD+07yfpxmcsNQgax/6qJ0H4Xn7EWAM99426pfwhwlYDz0LoU1xGm2rgXQh9vu+smWoQXAY2uJhr0LMQ+uR31gw1GPVs1lZMNUj/PeIOqaUGchrV4Cp2GujrqATZZbSVBr274n5bNdJANuOJjQY8ozl6GtRm3sD9yDPb824QuHjqo/ureOYJ8p8TZKJHDwEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOB/+wQBph2Iu8J1cQAAAABJRU5ErkJggg==';

function SearchQueryItem(shop : Shop) {
  const defaultImage = DEFAULT_URL;
  const { data } = shop;
  const { placeName, address } = data;

  return (
    <div className={styles['search-item']}>
      <img className={styles['search-item__image']} alt="사진" src={defaultImage} />
      <div className={styles['search-item__content']}>
        <section className={styles['search-item__info']}>
          <h1 className={styles['search-item__info--title']}>{placeName}</h1>
          <h2 className={styles['search-item__info--address']}>{address}</h2>
        </section>
        <section className={styles['search-item__status']}>
          <div className={styles['search-item__status-wrapper']}>
            <div>
              <div className={styles['search-item__status--business']}>
                <span className={styles['search-item__status--in-business']}>영업 중</span>
                {' '}
                - 21:00에 영업 종료
              </div>
              <div className={styles['search-item__status--distance']}>내 위치로부터 23m</div>
            </div>
            <MapIcon className={styles['search-item__status--map']} />
          </div>
        </section>
      </div>

    </div>
  );
}

export default SearchQueryItem;
