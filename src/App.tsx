import React, { useState, useRef } from 'react';
import { GiftIcon, Download, ImageDown, Printer } from 'lucide-react';
import { BingoSettings } from './components/BingoSettings';
import { PrintSettings } from './components/PrintSettings';
import { BingoCardGrid } from './components/BingoCardGrid';
import { generateBingoCards } from './utils/bingo';
import { downloadAllCardsAsImages } from './utils/download';
import type { BingoSettings as BingoSettingsType, BingoCard as BingoCardType } from './types/bingo';

function App() {
  const [settings, setSettings] = useState<BingoSettingsType>({
    mode: 'emojis',
    customItems: [],
    numberOfCards: 30,
    customMessage: '',
    cardsPerPage: 4
  });

  const [cards, setCards] = useState<BingoCardType[]>([]);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleGenerateCards = () => {
    const generatedCards = generateBingoCards(settings.customItems, settings.numberOfCards);
    setCards(generatedCards);
    cardsRefs.current = cardsRefs.current.slice(0, generatedCards.length);
  };

  const handleDownloadAll = async () => {
    const validRefs = cardsRefs.current.filter((ref): ref is HTMLDivElement => ref !== null);
    if (validRefs.length > 0) {
      await downloadAllCardsAsImages(validRefs);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white py-6 shadow-lg no-print">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <GiftIcon className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Christmas Bingo Generator</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="no-print">
          <BingoSettings settings={settings} onSettingsChange={setSettings} />
          <PrintSettings
            cardsPerPage={settings.cardsPerPage}
            onChange={(value) => setSettings({ ...settings, cardsPerPage: value })}
          />
          
          <div className="text-center mb-8 space-x-4">
            <button
              onClick={handleGenerateCards}
              className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Generate Bingo Cards
            </button>
            
            {cards.length > 0 && (
              <>
                <button
                  onClick={handleDownloadAll}
                  className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
                >
                  <ImageDown className="w-5 h-5" />
                  Download All Cards (ZIP)
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
                >
                  <Printer className="w-5 h-5" />
                  Print Cards
                </button>
              </>
            )}
          </div>
        </div>

        {cards.length > 0 ? (
          <BingoCardGrid
            cards={cards}
            cardsPerPage={settings.cardsPerPage}
            customMessage={settings.customMessage}
            refs={cardsRefs}
          />
        ) : (
          <div className="text-center text-gray-500 mt-8 no-print">
            Click the generate button to create your bingo cards!
          </div>
        )}
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8 no-print">
        <div className="container mx-auto px-4 text-center">
          <p>Made with ❤️ for Christmas Bingo fun!</p>
        </div>
      </footer>
    </div>
  );
}

export default App;