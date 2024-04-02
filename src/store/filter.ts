import { atom, useAtomValue, useSetAtom } from 'jotai';

export const filterFriendAtom = atom<boolean>(false);
export const filterScrapAtom = atom<boolean>(false);
export const filterNearbyAtom = atom<boolean>(false);

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
