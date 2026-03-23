import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const base =
    'relative flex items-center justify-center p-1.5 text-center rounded transition-all duration-150 select-none min-h-[60px] text-[10px] sm:text-xs leading-tight border';

  let state: string;
  if (square.isFreeSpace) {
    state =
      'bg-cyber-surface-raised border-cyber-cyan/30 text-cyber-cyan font-bold cursor-default';
  } else if (isWinning) {
    state =
      'bg-cyber-gold/15 border-cyber-gold text-cyber-gold border-glow-gold font-semibold cursor-pointer';
  } else if (square.isMarked) {
    state =
      'bg-cyber-green/10 border-cyber-green text-cyber-green font-medium cursor-pointer';
  } else {
    state =
      'bg-cyber-surface border-cyber-border text-cyber-text hover:border-cyber-border-bright hover:bg-cyber-surface-hover active:scale-95 cursor-pointer';
  }

  return (
    <button
      onClick={onClick}
      disabled={square.isFreeSpace}
      className={`${base} ${state}`}
      aria-pressed={square.isMarked}
      aria-label={square.isFreeSpace ? 'Free space' : square.text}
    >
      <span className="break-words hyphens-auto leading-snug">{square.text}</span>
      {square.isMarked && !square.isFreeSpace && (
        <span className="absolute top-0.5 right-0.5 text-cyber-green text-[9px] leading-none">
          ✓
        </span>
      )}
    </button>
  );
}

