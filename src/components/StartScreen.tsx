interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-full p-6 overflow-hidden scanlines cyber-grid bg-cy-bg"
    >
      {/* Ambient glow blobs */}
      <div
        aria-hidden="true"
        className="absolute top-[-20%] left-[-10%] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden="true"
        className="absolute bottom-[-15%] right-[-10%] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,45,120,0.07) 0%, transparent 70%)' }}
      />

      {/* Content layer above scanlines */}
      <div className="relative z-10 text-center w-full max-w-sm">

        {/* ── Hero title ── */}
        <div
          className="mb-1"
          style={{ animation: 'flicker-in 0.8s ease-out both' }}
        >
          <p
            className="font-cyber text-xs tracking-[0.4em] text-cy-text-dim mb-2 uppercase"
            style={{ animation: 'slide-up-fade 0.5s 0.1s ease-out both' }}
          >
            Neo-Tokyo Division
          </p>
          <h1
            className="font-cyber font-black text-5xl sm:text-6xl tracking-wider text-cy-cyan neon-text-cyan uppercase"
          >
            SOC OPS
          </h1>
          <p
            className="font-mono text-cy-text-dim text-sm tracking-widest mt-1"
            style={{ animation: 'slide-up-fade 0.5s 0.3s ease-out both' }}
          >
            SOCIAL BINGO — v1.0
          </p>
        </div>

        {/* Decorative divider */}
        <div
          className="flex items-center gap-3 my-6"
          style={{ animation: 'slide-up-fade 0.5s 0.4s ease-out both' }}
          aria-hidden="true"
        >
          <div className="flex-1 h-px bg-cy-border" />
          <span className="text-cy-cyan text-xs font-mono">◈</span>
          <div className="flex-1 h-px bg-cy-border" />
        </div>

        {/* ── Mission briefing panel ── */}
        <div
          className="rounded-lg p-5 mb-6 text-left neon-box-cyan"
          style={{
            background: '#070d1a',
            border: '1px solid #00f5ff40',
            animation: 'slide-up-fade 0.5s 0.5s ease-out both',
          }}
        >
          <h2
            className="font-cyber text-cy-cyan text-xs tracking-[0.3em] uppercase mb-4 neon-text-cyan"
          >
            ▶ Mission Briefing
          </h2>
          <ul className="font-mono text-cy-text-dim text-sm space-y-3">
            <li className="flex gap-3">
              <span className="text-cy-cyan shrink-0">01</span>
              <span>Locate operatives who match each target profile</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cy-cyan shrink-0">02</span>
              <span>Tap a square to mark a confirmed match</span>
            </li>
            <li className="flex gap-3">
              <span className="text-cy-cyan shrink-0">03</span>
              <span>Secure 5 in a row to trigger BINGO protocol</span>
            </li>
          </ul>
        </div>

        {/* ── CTA Button ── */}
        <button
          onClick={onStart}
          className="cta-animate w-full font-cyber font-bold text-sm tracking-[0.2em] py-4 px-8 rounded uppercase text-white focus-visible:outline-2 focus-visible:outline-cy-magenta focus-visible:outline-offset-2"
          style={{
            background: 'linear-gradient(135deg, #c40050 0%, #ff2d78 50%, #c40050 100%)',
            border: '1px solid #ff2d78',
            boxShadow: '0 0 12px rgba(255,45,120,0.5), 0 0 24px rgba(255,45,120,0.2)',
          }}
        >
          ⚡ Initiate Mission
        </button>

        <p
          className="font-mono text-cy-text-dim text-xs mt-4"
          style={{ animation: 'slide-up-fade 0.5s 0.8s ease-out both' }}
        >
          CLEARANCE LEVEL: OPEN
        </p>
      </div>
    </div>
  );
}
