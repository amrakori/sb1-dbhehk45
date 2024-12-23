import React from 'react';
import { BingoCard as BingoCardComponent } from './BingoCard';
import type { BingoCard } from '../types/bingo';

interface Props {
  cards: BingoCard[];
  cardsPerPage: number;
  customMessage?: string;
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export const BingoCardGrid: React.FC<Props> = ({
  cards,
  cardsPerPage,
  customMessage,
  refs,
}) => {
  // Group cards into pages
  const pages = cards.reduce((acc, card, index) => {
    const pageIndex = Math.floor(index / cardsPerPage);
    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }
    acc[pageIndex].push(card);
    return acc;
  }, [] as BingoCard[][]);

  return (
    <div className="cards-container">
      {pages.map((pageCards, pageIndex) => (
        <div
          key={pageIndex}
          className={`print-container print-grid-${cardsPerPage}`}
          style={{ pageBreakAfter: 'always' }}
        >
          {pageCards.map((card, index) => (
            <div key={card.id} className="bingo-card">
              <BingoCardComponent
                card={card}
                customMessage={customMessage}
                ref={(el) => refs.current[pageIndex * cardsPerPage + index] = el}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};