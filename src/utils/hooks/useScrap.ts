import { useMutation } from '@tanstack/react-query';
import { deleteScrapShop, scrapShop } from 'api/scrap';
import { useState } from 'react';

const useScrap = (placeId: string, initialScrapId: number | null) => {
  const [scrapId, setScrapId] = useState<number | null>(initialScrapId);

  const { mutate: postScrap, isPending: postPending } = useMutation({
    mutationFn: scrapShop,
    onSuccess: (res) => setScrapId(res.data.id),
  });

  const { mutate: deleteScrap, isPending: deletePending } = useMutation({
    mutationFn: deleteScrapShop,
  });

  const toggleScrap = () => {
    if (scrapId) {
      deleteScrap(scrapId);
      setScrapId(null);
    } else {
      postScrap(placeId as string);
    }
  };

  const isPending = postPending || deletePending;

  return { scrapId, toggleScrap, isPending };
};

export default useScrap;
