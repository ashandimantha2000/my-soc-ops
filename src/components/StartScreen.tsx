interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full p-6 bg-cyber-bg cyber-grid relative overflow-hidden">
      {/* Decorative accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-cyan/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-pink/30 to-transparent" />

      <div className="text-center max-w-sm w-full relative z-10 animate-slide-up">
        {/* Title block */}
        <p className="text-cyber-text-muted text-xs tracking-[0.3em] uppercase mb-3">
          Social Bingo
        </p>
        <h1 className="font-display text-5xl font-black text-cyber-cyan glow-cyan tracking-widest mb-10">
          SOC OPS
        </h1>

        {/* How to play card */}
        <div className="bg-cyber-surface border border-cyber-border-bright rounded-lg p-5 mb-6 text-left border-glow-cyan">
          <h2 className="text-cyber-cyan text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            ▸ How to play
          </h2>
          <ul className="text-cyber-text text-sm space-y-2.5">
            <li className="flex items-start gap-2">
              <span className="text-cyber-pink mt-0.5 shrink-0">→</span>
              <span>Find people who match the prompts</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyber-pink mt-0.5 shrink-0">→</span>
              <span>Tap a square when you find a match</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyber-pink mt-0.5 shrink-0">→</span>
              <span>Get 5 in a row to win!</span>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="w-full bg-cyber-cyan text-cyber-bg font-display font-bold py-4 px-8 rounded-lg text-base tracking-[0.2em] uppercase hover:bg-cyber-cyan-dim active:scale-95 transition-all duration-150"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

