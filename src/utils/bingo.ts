import { BingoCard } from '../types/bingo';
import { christmasEmojis } from './emojis';
import { generateUniqueCard } from './uniqueCards';
import { validateItems } from './validation';

export const generateBingoCards = (
  items: string[],
  numberOfCards: number
): BingoCard[] => {
  const validation = validateItems(items);
  const bingoItems = validation.isValid ? validation.uniqueItems : christmasEmojis;
  
  if (bingoItems.length < 24) {
    throw new Error('Need at least 24 items to generate bingo cards');
  }

  const cards: BingoCard[] = [];
  let currentId = 1;

  while (cards.length < numberOfCards) {
    const uniqueCard = generateUniqueCard(cards, bingoItems, currentId);
    if (uniqueCard) {
      cards.push(uniqueCard);
      currentId++;
    } else {
      // If we can't generate any more unique cards, break the loop
      break;
    }
  }

  return cards;
};