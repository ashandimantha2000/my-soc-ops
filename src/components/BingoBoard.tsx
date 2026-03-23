import type { BingoSquareData } from '../types';
import { BingoSquare } from './BingoSquare';

interface BingoBoardProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  onSquareClick: (squareId: number) => void;
}

export function BingoBoard({ board, winningSquareIds, onSquareClick }: BingoBoardProps) {
  return (
    <div
      className="w-full max-w-md mx-auto rounded-lg p-2"
      style={{
        background: '#0a1020',
        border: '1px solid #00f5ff30',
        boxShadow: '0 0 0 1px #00f5ff10, 0 0 24px #00f5ff12, inset 0 0 24px #00f5ff06',
      }}
    >
      {/* Board header */}
      <div
        className="flex justify-between items-center px-1 pb-2"
        aria-hidden="true"
      >
        {['B', 'I', 'N', 'G', 'O'].map((letter) => (
          <span
            key={letter}
            className="font-cyber font-black text-cy-cyan neon-text-cyan text-lg w-full text-center"
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1 aspect-square">
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
  );
}
