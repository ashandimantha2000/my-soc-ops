import type { BingoSquareData } from '../types';
import { BingoBoard } from './BingoBoard';

interface GameScreenProps {
  board: BingoSquareData[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  board,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-cyber-bg">
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-2.5 bg-cyber-surface border-b border-cyber-border-bright">
        <button
          onClick={onReset}
          className="text-cyber-text-muted text-xs px-3 py-1.5 rounded border border-cyber-border hover:border-cyber-cyan hover:text-cyber-cyan transition-colors duration-150 tracking-wide"
        >
          ◄ Reset
        </button>
        <h1 className="font-display font-bold text-cyber-cyan text-sm tracking-[0.25em] uppercase glow-cyan">
          Soc Ops
        </h1>
        <div className="w-16" />
      </header>

      {/* Instruction */}
      <p className="text-center text-cyber-text-muted text-xs py-2 px-4 tracking-wide">
        Tap a square when you find someone who matches it.
      </p>

      {/* Bingo banner */}
      {hasBingo && (
        <div className="bg-cyber-gold/10 border-y border-cyber-gold/40 text-cyber-gold text-center py-2 font-bold text-sm tracking-[0.2em] glow-gold">
          ★ BINGO! YOU GOT A LINE! ★
        </div>
      )}

      {/* Board */}
      <div className="flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}

