import { useEffect, useRef } from 'react';

interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  const dismissButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dismissButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onDismiss]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bingo-title"
        aria-describedby="bingo-description"
        className="cp-shell cp-scanline w-full max-w-sm rounded-2xl p-6 text-center animate-pop-in"
      >
        <div className="text-5xl [text-shadow:0_0_20px_rgb(255_46_196/60%)]">🎉</div>
        <h2 id="bingo-title" className="cp-title mt-3 text-4xl font-black text-neon-amber animate-neon-pulse">
          BINGO
        </h2>
        <p id="bingo-description" className="mt-3 text-lg text-ink-soft">Signal locked. You completed a line.</p>

        <button
          ref={dismissButtonRef}
          onClick={onDismiss}
          className="cp-btn-primary cp-focus mt-6 w-full rounded-xl px-6 py-3 text-lg font-semibold uppercase tracking-[0.11em]"
        >
          Continue Run
        </button>
      </div>
    </div>
  );
}
