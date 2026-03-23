import type { BingoSquareData, GameMode, ScavengerItem } from '../types';
import { BingoBoard } from './BingoBoard';
import { ScavengerChecklist } from './ScavengerChecklist';

interface GameScreenProps {
  mode: GameMode;
  board: BingoSquareData[];
  scavengerItems: ScavengerItem[];
  winningSquareIds: Set<number>;
  hasBingo: boolean;
  onSquareClick: (squareId: number) => void;
  onItemToggle: (itemId: number) => void;
  onReset: () => void;
}

export function GameScreen({
  mode,
  board,
  scavengerItems,
  winningSquareIds,
  hasBingo,
  onSquareClick,
  onItemToggle,
  onReset,
}: GameScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
        <button
          onClick={onReset}
          className="text-gray-500 text-sm px-3 py-1.5 rounded active:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← Back
        </button>
        <h1 className="font-bold text-gray-900">Soc Ops</h1>
        <div className="w-16"></div>
      </header>

      {mode === 'bingo' ? (
        <>
          {/* Bingo instructions */}
          <p className="text-center text-gray-500 text-sm py-2 px-4">
            Tap a square when you find someone who matches it.
          </p>

          {/* Bingo indicator */}
          {hasBingo && (
            <div className="bg-amber-100 text-amber-800 text-center py-2 font-semibold text-sm">
              🎉 BINGO! You got a line!
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
        </>
      ) : (
        <>
          {/* Scavenger instructions */}
          <p className="text-center text-gray-500 text-sm py-2 px-4">
            Tap an item when you spot it around the venue.
          </p>

          {/* Checklist */}
          <div className="flex-1 overflow-y-auto pt-2">
            <ScavengerChecklist items={scavengerItems} onItemToggle={onItemToggle} />
          </div>
        </>
      )}
    </div>
  );
}
