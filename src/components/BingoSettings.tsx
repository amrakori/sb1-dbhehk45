import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { ItemInput } from './ItemInput';
import { validateItems } from '../utils/validation';
import type { BingoSettings as BingoSettingsType, BingoMode } from '../types/bingo';

interface Props {
  settings: BingoSettingsType;
  onSettingsChange: (settings: BingoSettingsType) => void;
}

export const BingoSettings: React.FC<Props> = ({ settings, onSettingsChange }) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleModeChange = (mode: BingoMode) => {
    onSettingsChange({ ...settings, mode });
  };

  const handleItemsChange = (items: string[]) => {
    const validation = validateItems(items);
    setValidationErrors(validation.errors);
    onSettingsChange({ ...settings, customItems: items });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(100, Math.max(30, Number(e.target.value)));
    onSettingsChange({ ...settings, numberOfCards: value });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSettingsChange({ ...settings, customMessage: e.target.value });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-bold text-gray-800">Bingo Settings</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Mode</label>
          <div className="flex gap-4">
            <button
              onClick={() => handleModeChange('emojis')}
              className={`px-4 py-2 rounded-md ${
                settings.mode === 'emojis'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Emojis
            </button>
            <button
              onClick={() => handleModeChange('words')}
              className={`px-4 py-2 rounded-md ${
                settings.mode === 'words'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Words
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Message (appears at the top of each card)
          </label>
          <input
            type="text"
            value={settings.customMessage}
            onChange={handleMessageChange}
            placeholder="e.g., Merry Christmas!"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <ItemInput
          value={settings.customItems}
          onChange={handleItemsChange}
          mode={settings.mode}
          errors={validationErrors}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Cards (30-100)
          </label>
          <input
            type="number"
            min="30"
            max="100"
            value={settings.numberOfCards}
            onChange={handleNumberChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};