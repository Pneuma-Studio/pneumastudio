import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050D1A',
          borderRadius: '6px',
          border: '1px solid rgba(0,196,160,0.3)',
        }}
      >
        <span
          style={{
            fontSize: '14px',
            fontWeight: '800',
            color: '#00C4A0',
            letterSpacing: '-0.5px',
            fontFamily: 'sans-serif',
          }}
        >
          PS
        </span>
      </div>
    ),
    { ...size }
  );
}
