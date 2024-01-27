import { atom, useAtomValue, useSetAtom } from 'jotai';

import { ReviewParams } from 'api/review/entity';

type ReviewAtom = Omit<ReviewParams, 'placeId'>;

const reviewAtom = atom<ReviewAtom>({
  content: '',
  rate: 0,
  reviewImages: [],
});

export const useReview = () => useAtomValue(reviewAtom);

export const useSetReview = () => useSetAtom(reviewAtom);

export const useRate = () => {
  const review = useReview();
  const setReview = useSetReview();

  const setRate = (rate: number) => {
    setReview({ ...review, rate });
  };

  return [review.rate, setRate] as const;
};
