'use client';

export default function BlogError({ error }: { error: Error & { digest?: string } }) {
  return (
    <div style={{ padding: '40px', fontFamily: 'monospace', background: '#050D1A', color: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#ff6b6b' }}>Blog post error</h2>
      <p style={{ color: '#8A9BB5' }}>Message: {error.message}</p>
      <p style={{ color: '#8A9BB5' }}>Digest: {error.digest}</p>
      <pre style={{ color: '#00C4A0', whiteSpace: 'pre-wrap', fontSize: '12px' }}>{error.stack}</pre>
    </div>
  );
}
