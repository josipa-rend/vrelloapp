import { Line } from './line';
import { User } from './user';

export interface Board {
  id: number;
  name: string;
  members: Array<User>;
  lines: Array<Line>;
}
