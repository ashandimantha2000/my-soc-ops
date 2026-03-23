interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <main className="relative min-h-full overflow-hidden">
      <div className="absolute inset-0 cp-grid-bg opacity-70"></div>
      <div className="pointer-events-none absolute -left-28 top-[12%] h-60 w-60 rounded-full bg-neon-magenta/22 blur-3xl animate-float-shift"></div>
      <div className="pointer-events-none absolute -right-32 bottom-[8%] h-72 w-72 rounded-full bg-neon-cyan/22 blur-3xl animate-float-shift [animation-delay:0.9s]"></div>

      <section className="relative z-10 mx-auto flex min-h-full w-full max-w-2xl items-center px-4 py-8 sm:px-6">
        <div className="cp-shell cp-scanline w-full rounded-2xl p-5 sm:p-8 animate-entry-rise">
          <p className="text-[0.72rem] uppercase tracking-[0.32em] text-neon-cyan/80">Sector Event // Live Session</p>
          <h1 className="cp-title mt-3 text-4xl font-black text-ink-bright sm:text-5xl">SOC OPS</h1>
          <p className="mt-2 text-lg uppercase tracking-[0.25em] text-neon-magenta-soft">Social Bingo Protocol</p>

          <div className="mt-6 rounded-xl border border-hud-border/75 bg-night-core/80 p-4 sm:p-5">
            <h2 className="cp-title text-base font-bold text-neon-cyan-soft sm:text-lg">Mission Rules</h2>
            <ul className="mt-3 space-y-2 text-left text-[1.02rem] text-ink-soft sm:text-lg">
            <li>• Find people who match the questions</li>
            <li>• Tap a square when you find a match</li>
            <li>• Get 5 in a row to win!</li>
          </ul>
          </div>

          <button
            onClick={onStart}
            className="cp-btn-primary cp-focus mt-7 w-full rounded-xl px-8 py-4 text-xl font-semibold uppercase tracking-[0.16em]"
          >
            Jack In
          </button>
        </div>
      </section>
    </main>
  );
}
