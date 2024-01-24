export interface Card {
  photoToken: string | null;
  name: string;
  category: string;
  placeId: string;
}

export interface Cards extends Array<Card> {}
