/** Domain types for the Bingo and Scavenger Hunt games */

export interface BingoSquareData {
  id: number;
  text: string;
  isMarked: boolean;
  isFreeSpace: boolean;
}

export interface BingoLine {
  type: 'row' | 'column' | 'diagonal';
  index: number;
  squares: number[];
}

export interface ScavengerItem {
  id: number;
  text: string;
  isChecked: boolean;
}

export type GameMode = 'bingo' | 'scavenger';

export type GameState = 'start' | 'playing' | 'bingo' | 'scavenger-complete';
