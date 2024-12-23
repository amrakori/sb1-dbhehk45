import React from 'react';
import { Printer } from 'lucide-react';

interface Props {
  cardsPerPage: number;
  onChange: (value: number) => void;
}

export const PrintSettings: React.FC<Props> = ({ cardsPerPage, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Printer className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-bold text-gray-800">Print Settings</h2>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cards per Page
        </label>
        <select
          value={cardsPerPage}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-md"
        >
          <option value={1}>1 card per page</option>
          <option value={2}>2 cards per page</option>
          <option value={4}>4 cards per page</option>
          <option value={6}>6 cards per page</option>
          <option value={9}>9 cards per page</option>
        </select>
        <p className="text-sm text-gray-500 mt-1">
          Choose how many bingo cards to display on each printed page
        </p>
      </div>
    </div>
  );
};