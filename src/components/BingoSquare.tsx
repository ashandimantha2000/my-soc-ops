import type { BingoSquareData } from '../types';

interface BingoSquareProps {
  square: BingoSquareData;
  isWinning: boolean;
  onClick: () => void;
}

export function BingoSquare({ square, isWinning, onClick }: BingoSquareProps) {
  const baseClasses =
    'cp-focus relative flex min-h-[64px] select-none items-center justify-center overflow-hidden rounded-md border p-1 text-center text-[0.62rem] leading-tight transition-all duration-200 sm:text-xs';

  const stateClasses = square.isMarked
    ? isWinning
      ? 'border-neon-amber/90 bg-neon-amber/22 text-neon-amber shadow-[0_0_14px_rgb(255_190_27_/_40%)]'
      : 'border-neon-lime/80 bg-neon-lime/18 text-[#ddffad] shadow-[0_0_12px_rgb(180_255_55_/_34%)]'
    : 'border-hud-border/70 bg-night-panel/90 text-ink-soft hover:border-neon-cyan/75 hover:text-ink-bright active:scale-[0.985]';

  const freeSpaceClasses = square.isFreeSpace
    ? 'font-bold text-[0.74rem] uppercase tracking-[0.08em] text-neon-magenta-soft sm:text-sm animate-neon-pulse'
    : '';

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
        <span className="absolute right-1 top-1 text-[0.62rem] text-neon-cyan sm:text-xs">✓</span>
      )}
      {!square.isMarked && !square.isFreeSpace && (
        <span className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 hover:opacity-100 [background:linear-gradient(135deg,transparent_40%,rgb(42_246_255/16%),transparent_66%)]"></span>
      )}
    </button>
  );
}
