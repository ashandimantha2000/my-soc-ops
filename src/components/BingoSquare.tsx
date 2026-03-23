import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'relative flex flex-col items-center justify-center p-1 text-center rounded select-none min-h-[56px] text-xs leading-tight font-mono';

  let stateClass: string;
  if (square.isFreeSpace) {
    stateClass = 'sq-free font-cyber font-bold text-sm';
  } else if (square.isMarked && isWinning) {
    stateClass = 'sq-winning font-bold';
  } else if (square.isMarked) {
    stateClass = 'sq-marked';
  } else {
    stateClass = 'sq-default';
  }

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${baseClasses} ${stateClass}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      {square.isFreeSpace ? (
        <>
          <span className="text-lg leading-none mb-0.5" aria-hidden="true">★</span>
          <span className="text-[10px] tracking-wider uppercase">{square.text}</span>
        </>
      ) : (
        <>
          <span className="break-words hyphens-auto w-full">{square.text}</span>
          {square.isMarked && (
            <span
              className="absolute top-0.5 right-1 text-[10px] font-bold"
              aria-hidden="true"
            >
              {isWinning ? '◆' : '✓'}
            </span>
          )}
        </>
      )}
    </button>
  );
}
