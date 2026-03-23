import { useEffect } from 'react';

interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 bg-cyber-bg/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onDismiss}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bingo-title"
        onClick={(e) => e.stopPropagation()}
        className="bg-cyber-surface border border-cyber-gold/50 rounded-xl p-8 max-w-xs w-full text-center border-glow-gold animate-scale-in"
      >
        <div className="text-5xl mb-4" aria-hidden="true">
          🎉
        </div>
        <h2
          id="bingo-title"
          className="font-display text-4xl font-black text-cyber-gold glow-gold mb-2 tracking-widest"
        >
          BINGO!
        </h2>
        <p className="text-cyber-text-muted text-sm mb-6">You completed a line!</p>

        <button
          onClick={onDismiss}
          autoFocus
          className="w-full bg-cyber-cyan text-cyber-bg font-display font-bold py-3 px-6 rounded-lg tracking-[0.2em] uppercase hover:bg-cyber-cyan-dim active:scale-95 transition-all duration-150"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}

