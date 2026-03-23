interface ScavengerModalProps {
  onDismiss: () => void;
}

export function ScavengerModal({ onDismiss }: ScavengerModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scavenger-modal-title"
    >
      <div className="bg-white rounded-xl p-6 max-w-xs w-full text-center shadow-xl animate-[bounce_0.5s_ease-out]">
        <div className="text-5xl mb-4">🔍</div>
        <h2
          id="scavenger-modal-title"
          className="text-3xl font-bold text-scavenger mb-2"
        >
          Complete!
        </h2>
        <p className="text-gray-600 mb-6">You found everything on the list!</p>

        <button
          onClick={onDismiss}
          className="w-full bg-scavenger text-white font-semibold py-3 px-6 rounded-lg active:bg-scavenger/80 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-scavenger"
        >
          Keep Exploring
        </button>
      </div>
    </div>
  );
}
