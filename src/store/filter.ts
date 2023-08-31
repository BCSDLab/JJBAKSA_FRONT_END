import { atom, useAtomValue, useSetAtom } from 'jotai';

export const filterFriendAtom = atom<0 | 1>(0);
export const filterScrapAtom = atom<0 | 1>(0);
export const filterNearbyAtom = atom<0 | 1>(0);

export const useFilterFriend = () => {
  const filterFriendState = useAtomValue(filterFriendAtom);
  const setFilterFriend = useSetAtom(filterFriendAtom);

  return {
    filterFriendState,
    setFilterFriend,
  };
};

export const useFilterScrap = () => {
  const filterScrapState = useAtomValue(filterScrapAtom);
  const setFilterScrap = useSetAtom(filterScrapAtom);

  return {
    filterScrapState,
    setFilterScrap,
  };
};

export const useFilterNearby = () => {
  const filterNearbyState = useAtomValue(filterNearbyAtom);
  const setFilterNearby = useSetAtom(filterNearbyAtom);

  return {
    filterNearbyState,
    setFilterNearby,
  };
};
