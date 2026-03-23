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
    <div className="relative flex flex-col min-h-full overflow-hidden cyber-grid bg-cy-bg scanlines">
      {/* Ambient blobs */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at top right, rgba(0,245,255,0.06) 0%, transparent 65%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-64 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(circle at bottom left, rgba(255,45,120,0.05) 0%, transparent 65%)' }}
      />

      {/* ── HUD Header ── */}
      <header
        className="relative z-10 flex items-center justify-between px-3 py-2"
        style={{
          background: '#070d1aee',
          borderBottom: '1px solid #1a304d',
          boxShadow: '0 1px 0 rgba(0,245,255,0.1)',
        }}
      >
        <button
          onClick={onReset}
          className="hud-abort font-mono text-cy-text-dim text-xs px-3 py-1.5 rounded uppercase tracking-widest"
          aria-label="Abort mission and return to start"
        >
          ← Abort
        </button>

        <h1
          className="font-cyber font-bold text-cy-cyan neon-text-cyan text-sm tracking-widest uppercase"
        >
          SOC OPS
        </h1>

        {/* HUD status indicator */}
        <div className="font-mono text-xs text-cy-text-dim flex items-center gap-1.5">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-cy-green"
            style={{ boxShadow: '0 0 4px #00ff88', animation: 'neon-pulse 2s ease-in-out infinite' }}
            aria-hidden="true"
          />
          <span className="hidden sm:inline uppercase tracking-wider">Active</span>
        </div>
      </header>

      {/* ── Status Bar ── */}
      <div
        className="relative z-10 text-center py-1.5 px-4"
        style={{ borderBottom: '1px solid #1a304d10' }}
      >
        {hasBingo ? (
          <p
            className="font-cyber text-cy-magenta text-xs tracking-widest uppercase font-bold"
            style={{ animation: 'bingo-banner 1.2s ease-in-out infinite' }}
          >
            ⚡ BINGO! — Line Secured ⚡
          </p>
        ) : (
          <p className="font-mono text-cy-text-dim text-xs tracking-wider uppercase">
            Locate target → tap square to mark
          </p>
        )}
      </div>

      {/* ── Board Area ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-3">
        <BingoBoard
          board={board}
          winningSquareIds={winningSquareIds}
          onSquareClick={onSquareClick}
        />
      </div>
    </div>
  );
}
