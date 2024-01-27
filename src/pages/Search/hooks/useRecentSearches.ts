import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Card, Cards } from 'pages/Search/static/entity';

const recentSearchCardsAtom = atomWithStorage<Cards>('recent_searches', []);

const useRecentSearches = () => {
  const [cards, setCards] = useAtom(recentSearchCardsAtom);

  const addCard = (newCard: Card) => {
    setCards((prev) => {
      const filteredCards = prev.filter((item) => item.placeId !== newCard.placeId);
      return [newCard, ...filteredCards];
    });
  };

  const deleteCard = (targetCard: Card) => {
    setCards((prev) => prev.filter((item) => item.placeId !== targetCard.placeId));
  };

  const clearStorage = () => {
    setCards([]);
  };

  return {
    cards,
    addCard,
    deleteCard,
    clearStorage,
  };
};

export default useRecentSearches;
