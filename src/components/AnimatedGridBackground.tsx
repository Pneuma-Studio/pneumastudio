'use client';

export default function AnimatedGridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Grain texture via inline SVG data-uri */}
      <div className="grain-overlay" />

      {/* Ambient orbs */}
      <div
        className="cinematic-orb"
        style={{
          width: 700, height: 700,
          background: 'radial-gradient(circle, rgba(0,196,160,0.18) 0%, transparent 65%)',
          top: '-180px', right: '-180px',
          animationName: 'orb-drift-1',
          animationDuration: '22s',
        }}
      />
      <div
        className="cinematic-orb"
        style={{
          width: 560, height: 560,
          background: 'radial-gradient(circle, rgba(30,64,175,0.2) 0%, transparent 65%)',
          bottom: '60px', left: '-140px',
          animationName: 'orb-drift-2',
          animationDuration: '28s',
        }}
      />
      <div
        className="cinematic-orb"
        style={{
          width: 420, height: 420,
          background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 65%)',
          top: '38%', left: '38%',
          animationName: 'orb-drift-3',
          animationDuration: '34s',
        }}
      />

      {/* Subtle center highlight */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.04) 0%, transparent 60%)' }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-64"
        style={{ background: 'linear-gradient(to bottom, transparent, #050D1A)' }}
      />
    </div>
  );
}
