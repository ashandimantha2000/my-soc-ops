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
    <main className="relative min-h-full overflow-hidden px-3 py-3 sm:px-5 sm:py-5">
      <div className="absolute inset-0 cp-grid-bg opacity-60"></div>
      <div className="pointer-events-none absolute left-[5%] top-[18%] h-44 w-44 rounded-full bg-neon-cyan/18 blur-3xl"></div>
      <div className="pointer-events-none absolute right-[2%] bottom-[14%] h-52 w-52 rounded-full bg-neon-magenta/16 blur-3xl"></div>

      <section className="relative z-10 mx-auto flex min-h-full w-full max-w-4xl flex-col cp-shell rounded-2xl p-3 sm:p-5 animate-entry-rise">
        <header className="flex items-center justify-between gap-3 border-b border-hud-border/55 pb-3">
        <button
          onClick={onReset}
          className="cp-btn-secondary cp-focus rounded-lg px-3 py-1.5 text-base font-semibold uppercase tracking-[0.08em] sm:text-lg"
        >
          Back
        </button>
          <h1 className="cp-title text-lg font-black text-neon-cyan-soft sm:text-2xl">SOC OPS GRID</h1>
          <div className="cp-badge rounded-md px-2 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.12em] sm:text-xs">Live</div>
        </header>

        <div className="mt-3 rounded-xl border border-hud-border/45 bg-night-panel-2/75 p-3 sm:p-4">
          <p className="text-center text-base leading-snug text-ink-soft sm:text-lg">
            Tap a square when you find someone who matches it. Link five in a row to trigger bingo.
          </p>
        </div>

        {hasBingo && (
          <div className="mt-3 rounded-xl border border-neon-amber/80 bg-neon-amber/14 py-2 text-center text-sm font-bold uppercase tracking-[0.16em] text-neon-amber sm:text-base animate-pop-in">
            Bingo Line Confirmed
          </div>
        )}

        <div className="flex flex-1 items-center justify-center py-3 sm:py-5">
          <BingoBoard
            board={board}
            winningSquareIds={winningSquareIds}
            onSquareClick={onSquareClick}
          />
        </div>
      </section>
    </main>
  );
}
