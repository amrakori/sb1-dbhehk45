export interface BingoCard {
  id: number;
  cells: string[];
}

export type BingoMode = 'words' | 'emojis';

export interface BingoSettings {
  mode: BingoMode;
  customItems: string[];
  numberOfCards: number;
  customMessage: string;
  cardsPerPage: number;
}