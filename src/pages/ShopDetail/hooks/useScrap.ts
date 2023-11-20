import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteScrapShop, getMyScrapShop, scrapShop } from 'api/scrap';
import { useEffect, useState } from 'react';

const useScrap = (placeId: string, initialScrapId: number | null) => {
  const [scrapId, setScrapId] = useState<number | null>(initialScrapId);

  const { mutate: postScrap, isPending: postPending } = useMutation({
    mutationFn: scrapShop,
    onSuccess: (res) => setScrapId(res.data.id),
  });

  const { data: scrapShops } = useQuery({
    queryKey: ['scrapShops'],
    queryFn: getMyScrapShop,
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

  useEffect(() => {
    const filteredShop = scrapShops?.data.content.filter((shop) => shop.placeId === placeId)[0];

    if (filteredShop) {
      setScrapId(filteredShop.scrapId);
    }
  }, [scrapShops, placeId]);

  const isPending = postPending || deletePending;

  return { scrapId, toggleScrap, isPending };
};

export default useScrap;
