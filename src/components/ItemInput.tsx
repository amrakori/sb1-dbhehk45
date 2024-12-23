import React from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  value: string[];
  onChange: (items: string[]) => void;
  mode: 'words' | 'emojis';
  errors: string[];
}

export const ItemInput: React.FC<Props> = ({ value, onChange, mode, errors }) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const items = e.target.value.split('\n').filter(item => item.trim());
    onChange(items);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Custom Items (one per line)
      </label>
      <textarea
        value={value.join('\n')}
        onChange={handleChange}
        placeholder={mode === 'emojis' ? '🎅\n🎄\n⛄' : 'Santa\nTree\nSnowman'}
        className={`w-full h-32 px-3 py-2 border rounded-md ${
          errors.length > 0 ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {errors.length > 0 && (
        <div className="text-red-500 text-sm">
          {errors.map((error, index) => (
            <div key={index} className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          ))}
        </div>
      )}
      <p className="text-sm text-gray-500">
        Enter at least 24 unique items, one per line
      </p>
    </div>
  );
};