// Christmas-themed emojis
export const christmasEmojis = [
  '🎅', '🤶', '🎄', '🎁', '⛄',
  '❄️', '🦌', '🔔', '🎶', '🕯️',
  '🍪', '🥛', '🏠', '⭐', '👼',
  '🧦', '🛷', '🤍', '❤️', '🎀',
  '🕊️', '🍬', '🧣', '🧤', '🎉'
];

export const getRandomEmojis = (count: number): string[] => {
  const shuffled = [...christmasEmojis].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};