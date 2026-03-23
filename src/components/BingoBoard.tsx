import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div className="w-full max-w-sm sm:max-w-md md:max-w-lg">
      <div className="cp-shell rounded-2xl p-2 sm:p-3">
        <div className="mb-2 flex items-center justify-between text-[0.65rem] uppercase tracking-[0.18em] text-neon-cyan/80 sm:text-xs">
          <span>Neo Grid</span>
          <span>5x5 Link Matrix</span>
        </div>

        <div className="grid aspect-square grid-cols-5 gap-1.5 rounded-xl border border-hud-border/70 bg-night-core/85 p-1.5 sm:gap-2 sm:p-2">
          {board.map((square) => (
            <BingoSquare
              key={square.id}
              square={square}
              isWinning={winningSquareIds.has(square.id)}
              onClick={() => onSquareClick(square.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
