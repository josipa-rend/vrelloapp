import { Line } from './line';
import { Board } from './board';

export interface Card {
 id: number;
 name: string;
 description: string;
 boardId: number;
//  board: Board;
//  line: Line
}
