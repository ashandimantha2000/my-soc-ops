import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses = [
    'relative flex items-center justify-center p-1 text-center border rounded',
    'transition-colors duration-100 select-none min-h-[60px] text-xs leading-tight',
    'focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent',
  ].join(' ');

  const stateClasses = square.isMarked
    ? isWinning
      ? 'bg-surface border-bingo text-bingo'
      : 'bg-marked border-marked-border text-marked-border'
    : 'bg-surface border-border text-text active:opacity-60';

  const freeSpaceClasses = square.isFreeSpace ? 'font-bold text-accent' : '';

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClasses} ${freeSpaceClasses}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="wrap-break-word hyphens-auto">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-0.5 right-0.5 text-xs leading-none">
          {isWinning ? '★' : '✓'}
        </span>
      )}
    </button>
  );
}
