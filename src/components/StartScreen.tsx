import type { GameMode } from '../types';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-gray-50">
      <div className="text-center max-w-sm w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Soc Ops</h1>
        <p className="text-lg text-gray-600 mb-8">Social Games</p>

        {/* Bingo */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-4">
          <h2 className="font-semibold text-gray-800 mb-1">🎉 Social Bingo</h2>
          <ul className="text-left text-gray-600 text-sm space-y-1 mb-4">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
          <button
            onClick={() => onStart('bingo')}
            className="w-full bg-accent text-white font-semibold py-3 px-8 rounded-lg text-base active:bg-accent-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Play Bingo
          </button>
        </div>

        {/* Scavenger Hunt */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="font-semibold text-gray-800 mb-1">🔍 Scavenger Hunt</h2>
          <ul className="text-left text-gray-600 text-sm space-y-1 mb-4">
            <li>• Find items and people around the venue</li>
            <li>• Tap each item when you spot it</li>
            <li>• Check off all 20 items to win!</li>
          </ul>
          <button
            onClick={() => onStart('scavenger')}
            className="w-full bg-scavenger text-white font-semibold py-3 px-8 rounded-lg text-base active:bg-scavenger/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scavenger"
          >
            Start Scavenger Hunt
          </button>
        </div>
      </div>
    </div>
  );
}
