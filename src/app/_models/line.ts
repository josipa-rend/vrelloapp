import { Card } from './card';

export interface Line {
  id: number;
  name: string;
  cards: Array<Card>;
}
