export interface Card {
  category: string;
  name: string;
  photoToken: string | null;
  placeId: string;
}

export type Cards = Card[];
