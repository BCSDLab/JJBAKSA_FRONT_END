import { atom, useAtomValue, useSetAtom } from 'jotai';

export const filterFriendAtom = atom<boolean>(true);
export const filterScrapAtom = atom<boolean>(true);
export const filterNearbyAtom = atom<boolean>(true);

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
