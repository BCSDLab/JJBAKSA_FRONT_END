import { ReactComponent as BookMark } from 'assets/svg/pin/bookmark.svg';
import { ReactComponent as BookMarkActivated } from 'assets/svg/pin/bookmark_activated.svg';
import { useQuery, useQueryClient } from 'react-query';
import { getScrap, deleteScrap, postScrap } from 'api/scrap';
import { useEffect, useState } from 'react';
import styles from '../Pin.module.scss';

interface Props {
  placeId:string;
}
export default function Scrap({ placeId }:Props) {
  const queryClient = useQueryClient();
  const scrapList = useQuery('scrapList', () => getScrap());
  const [scrapId, setScrapId] = useState<number>(-1);
  console.log(scrapId);

  useEffect(() => {
    if (scrapList.status === 'success') {
      setScrapId(scrapList.data.content.find((v) => v.placeId === placeId)?.scrapId || -1);
    }
  }, [placeId, scrapList.data, scrapList.status]);

  const handleScrap = async () => {
    if (scrapId === -1) {
      postScrap({ directoryId: 0, placeId })
        .then((response) => {
          setScrapId(response.id);
          queryClient.removeQueries('scrapList');
        });
    } else {
      await deleteScrap(scrapId);
      queryClient.removeQueries('scrapList');
      setScrapId(-1);
    }
  };
  return (
    <button
      className={styles.shop__bookmark}
      type="button"
      onClick={handleScrap}
    >
      {scrapId === -1
        ? <BookMark />
        : <BookMarkActivated />}
      북마크
    </button>
  );
}
