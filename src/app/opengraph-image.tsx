import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Pneuma Studio — Diseñamos sistemas. Construimos el futuro.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050D1A',
          position: 'relative',
        }}
      >
        {/* Teal glow top-left */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,196,160,0.15) 0%, transparent 65%)',
          }}
        />
        {/* Blue glow bottom-right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(30,64,175,0.12) 0%, transparent 65%)',
          }}
        />

        {/* Top teal line */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '2px',
            background: 'linear-gradient(to right, transparent, rgba(0,196,160,0.6), transparent)',
          }}
        />

        {/* Logo wordmark */}
        <img
          src="https://pneumastudio.mx/assets/images/pneuma-studio-logo.png"
          width={320}
          height={107}
          style={{ objectFit: 'contain', marginBottom: '32px' }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: '600',
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: '-0.01em',
            marginBottom: '40px',
          }}
        >
          Diseñamos sistemas. Construimos el futuro.
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['Ecommerce', 'Automatización', 'Sistemas a medida'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                border: '1px solid rgba(0,196,160,0.3)',
                background: 'rgba(0,196,160,0.08)',
                color: '#00C4A0',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            color: 'rgba(138,155,181,0.6)',
            fontSize: '14px',
            letterSpacing: '0.05em',
          }}
        >
          pneumastudio.mx
        </div>
      </div>
    ),
    { ...size }
  );
}
