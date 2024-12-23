import React, { forwardRef } from 'react';
import { Download } from 'lucide-react';
import type { BingoCard as BingoCardType } from '../types/bingo';
import { downloadCardAsImage } from '../utils/download';

interface Props {
  card: BingoCardType;
  customMessage?: string;
}

export const BingoCard = forwardRef<HTMLDivElement, Props>(({ card, customMessage }, ref) => {
  const handleDownload = async () => {
    const element = ref as React.RefObject<HTMLDivElement>;
    if (element?.current) {
      await downloadCardAsImage(element.current, card.id);
    }
  };

  return (
    <div className="relative h-full">
      <button
        onClick={handleDownload}
        className="absolute top-2 right-2 z-10 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors no-print"
        title="Download card"
      >
        <Download className="w-4 h-4" />
      </button>
      
      <div ref={ref} className="card bg-white rounded-lg shadow-lg p-4">
        <div className="card-header mb-2">
          {customMessage && (
            <div className="custom-message text-lg text-green-600 font-medium text-center mb-2">
              {customMessage}
            </div>
          )}
          <h3 className="card-number text-lg font-bold text-center">Card #{card.id}</h3>
        </div>
        <div className="grid grid-cols-5 gap-2 flex-1">
          {card.cells.map((cell, index) => (
            <div
              key={`${card.id}-${index}`}
              className={`cell aspect-square flex items-center justify-center p-2 text-2xl border-2 border-green-600 rounded
                ${index === 12 ? 'free-space bg-red-100' : 'hover:bg-green-50'}`}
            >
              {cell}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});