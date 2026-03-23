interface BingoModalProps {
  onDismiss: () => void;
}

export function BingoModal({ onDismiss }: BingoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-xl p-6 max-w-xs w-full text-center border border-accent animate-[modal-in_0.25s_ease-out]">
        <div className="text-5xl mb-4">⚡</div>
        <h2 className="text-3xl font-bold text-accent mb-2 tracking-wide uppercase">BINGO!</h2>
        <p className="text-text-muted mb-6 text-sm">You completed a line!</p>

        <button
          onClick={onDismiss}
          className="w-full bg-accent text-bg font-bold py-3 px-6 rounded-lg active:opacity-75 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Keep Playing
        </button>
      </div>
    </div>
  );
}
