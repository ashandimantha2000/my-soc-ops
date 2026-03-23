interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-bg">
      <div
        className="text-center max-w-sm w-full animate-[fade-up_0.35s_ease-out]"
      >
        <h1 className="text-4xl font-bold text-accent mb-1 tracking-widest uppercase">
          Soc Ops
        </h1>
        <p className="text-text-muted mb-8 tracking-wide text-xs">
          Social Bingo
        </p>

        <div className="bg-surface rounded-lg p-6 border border-border mb-8">
          <h2 className="font-bold text-accent mb-3 text-xs uppercase tracking-wide">
            How to play
          </h2>
          <ul className="text-left text-text-muted text-sm space-y-2">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-accent text-bg font-bold py-4 px-8 rounded-lg text-lg active:opacity-75 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
