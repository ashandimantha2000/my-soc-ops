import { useEffect, useRef } from 'react';

interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Auto-focus the action button for keyboard users
    buttonRef.current?.focus();

    // ESC to dismiss
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onDismiss]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bingo-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 cyber-grid"
        style={{ background: 'rgba(2, 4, 18, 0.88)', backdropFilter: 'blur(4px)' }}
        onClick={onDismiss}
        aria-hidden="true"
      />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,45,120,0.12) 0%, transparent 60%)' }}
      />

      {/* Dialog panel */}
      <div
        className="relative w-full max-w-xs text-center rounded-xl p-7"
        style={{
          background: '#070d1a',
          border: '1px solid #ff2d7860',
          boxShadow: '0 0 0 1px #ff2d7820, 0 0 30px #ff2d7820, 0 0 60px #ff2d7810, inset 0 0 20px #ff2d7808',
          animation: 'modal-scale-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        }}
      >
        {/* Decorative corner accents */}
        <span
          aria-hidden="true"
          className="absolute top-2 left-2 text-cy-magenta text-xs"
          style={{ textShadow: '0 0 6px #ff2d78' }}
        >◤</span>
        <span
          aria-hidden="true"
          className="absolute top-2 right-2 text-cy-magenta text-xs"
          style={{ textShadow: '0 0 6px #ff2d78' }}
        >◥</span>
        <span
          aria-hidden="true"
          className="absolute bottom-2 left-2 text-cy-magenta text-xs"
          style={{ textShadow: '0 0 6px #ff2d78' }}
        >◣</span>
        <span
          aria-hidden="true"
          className="absolute bottom-2 right-2 text-cy-magenta text-xs"
          style={{ textShadow: '0 0 6px #ff2d78' }}
        >◢</span>

        {/* Status label */}
        <p
          className="reveal-1 font-mono text-cy-text-dim text-xs tracking-[0.3em] uppercase mb-4"
        >
          ▶ Protocol Triggered
        </p>

        {/* Big BINGO title */}
        <h2
          id="bingo-modal-title"
          className="font-cyber font-black text-cy-magenta neon-text-magenta text-5xl tracking-wider uppercase mb-1"
          style={{ animation: 'flicker-in 0.6s 0.1s ease-out both' }}
        >
          BINGO!
        </h2>

        {/* Sub-line */}
        <p
          className="reveal-2 font-mono text-cy-text text-sm mb-6"
        >
          Line secured. Mission objective met.
        </p>

        {/* Decorative divider */}
        <div
          className="reveal-3 flex items-center gap-2 mb-6"
          aria-hidden="true"
        >
          <div className="flex-1 h-px" style={{ background: '#ff2d7840' }} />
          <span className="text-cy-magenta text-xs">◈</span>
          <div className="flex-1 h-px" style={{ background: '#ff2d7840' }} />
        </div>

        {/* CTA */}
        <button
          ref={buttonRef}
          onClick={onDismiss}
          className="reveal-4 w-full font-cyber font-bold text-xs tracking-[0.25em] py-3 px-6 rounded uppercase text-white focus-visible:outline-2 focus-visible:outline-cy-cyan focus-visible:outline-offset-2"
          style={{
            background: 'linear-gradient(135deg, #007a87 0%, #00f5ff 50%, #007a87 100%)',
            border: '1px solid #00f5ff',
            boxShadow: '0 0 10px rgba(0,245,255,0.4), 0 0 20px rgba(0,245,255,0.15)',
          }}
        >
          ▶ Continue Mission
        </button>
      </div>
    </div>
  );
}
