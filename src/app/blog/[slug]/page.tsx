import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { getPostBySlug, getPostBlocks, BlogBlock } from '@/lib/notion';
import { getTagStyle } from '@/lib/blogTags';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

function fmtDate(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.titulo,
    description: post.extracto,
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.titulo,
      description: post.extracto,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.fechaPublicacion,
      images: [
        post.imagen
          ? { url: post.imagen, width: 1200, height: 630, alt: post.titulo }
          : { url: `${siteUrl}/assets/images/pneuma-studio-logo.png`, width: 1200, height: 630, alt: 'Pneuma Studio' },
      ],
    },
  };
}

function renderBlock(block: BlogBlock, i: number) {
  const baseText = { color: '#C8D5E8', lineHeight: '1.8', fontSize: '16px' };
  switch (block.type) {
    case 'h1':
      return <h1 key={i} className="text-3xl font-800 text-white mt-10 mb-4" style={{ letterSpacing: '-0.02em' }}>{block.text}</h1>;
    case 'h2':
      return <h2 key={i} className="text-2xl font-800 text-white mt-8 mb-3" style={{ letterSpacing: '-0.01em' }}>{block.text}</h2>;
    case 'h3':
      return <h3 key={i} className="text-xl font-700 text-white mt-6 mb-2">{block.text}</h3>;
    case 'paragraph':
      return block.text ? <p key={i} className="mb-5" style={baseText}>{block.text}</p> : null;
    case 'li':
      return <li key={i} className="mb-1.5 pl-1" style={baseText}>{block.text}</li>;
    case 'oli':
      return <li key={i} className="mb-1.5 pl-1 list-decimal" style={baseText}>{block.text}</li>;
    case 'quote':
      return (
        <blockquote key={i} className="my-6 pl-5 italic" style={{ borderLeft: '3px solid #00C4A0', color: 'rgba(200,213,232,0.8)', fontSize: '17px', lineHeight: '1.7' }}>
          {block.text}
        </blockquote>
      );
    case 'code':
      return (
        <pre key={i} className="my-6 p-5 rounded-xl overflow-x-auto text-sm" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#00C4A0', fontFamily: 'monospace' }}>
          <code>{block.text}</code>
        </pre>
      );
    case 'image':
      return block.url ? (
        <figure key={i} className="my-8">
          <img src={block.url} alt={block.text} className="w-full rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.06)' }} />
          {block.text && <figcaption className="text-center text-xs mt-2" style={{ color: '#8A9BB5' }}>{block.text}</figcaption>}
        </figure>
      ) : null;
    case 'divider':
      return <hr key={i} className="my-8" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />;
    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, blocks] = await Promise.all([getPostBySlug(slug), getPostBySlug(slug).then((p) => p ? getPostBlocks(p.id) : [])]);

  if (!post) notFound();

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${siteUrl}/blog/${post.slug}#article`,
        headline: post.titulo,
        description: post.extracto,
        url: `${siteUrl}/blog/${post.slug}`,
        datePublished: post.fechaPublicacion,
        dateModified: post.fechaPublicacion,
        author: { '@type': 'Person', name: post.autor },
        publisher: { '@type': 'Organization', name: 'Pneuma Studio', url: siteUrl },
        inLanguage: 'es-MX',
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
        image: post.imagen
          ? { '@type': 'ImageObject', url: post.imagen, width: 1200, height: 630 }
          : { '@type': 'ImageObject', url: `${siteUrl}/assets/images/pneuma-studio-logo.png`, width: 1200, height: 630 },
        ...(post.tags?.length ? { keywords: post.tags.join(', ') } : {}),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
          { '@type': 'ListItem', position: 3, name: post.titulo, item: `${siteUrl}/blog/${post.slug}` },
        ],
      },
    ],
  };

  // Group list items
  const rendered: React.ReactNode[] = [];
  let ulItems: BlogBlock[] = [];
  let olItems: BlogBlock[] = [];

  blocks.forEach((block, i) => {
    if (block.type === 'li') {
      olItems.length && (rendered.push(<ol key={`ol-${i}`} className="list-decimal pl-6 mb-5">{olItems.map((b, j) => renderBlock(b, j))}</ol>), olItems = []);
      ulItems.push(block);
    } else if (block.type === 'oli') {
      ulItems.length && (rendered.push(<ul key={`ul-${i}`} className="list-disc pl-6 mb-5">{ulItems.map((b, j) => renderBlock(b, j))}</ul>), ulItems = []);
      olItems.push(block);
    } else {
      ulItems.length && (rendered.push(<ul key={`ul-${i}`} className="list-disc pl-6 mb-5">{ulItems.map((b, j) => renderBlock(b, j))}</ul>), ulItems = []);
      olItems.length && (rendered.push(<ol key={`ol-${i}`} className="list-decimal pl-6 mb-5">{olItems.map((b, j) => renderBlock(b, j))}</ol>), olItems = []);
      rendered.push(renderBlock(block, i));
    }
  });
  ulItems.length && rendered.push(<ul key="ul-last" className="list-disc pl-6 mb-5">{ulItems.map((b, j) => renderBlock(b, j))}</ul>);
  olItems.length && rendered.push(<ol key="ol-last" className="list-decimal pl-6 mb-5">{olItems.map((b, j) => renderBlock(b, j))}</ol>);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <Header />
      <main className="pt-16">
        {/* Header */}
        <section className="pt-16 pb-10 relative overflow-hidden" style={{ background: '#050D1A' }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="max-w-3xl mx-auto px-4 sm:px-6 relative">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm mb-8 transition-colors duration-200 hover:text-primary" style={{ color: '#8A9BB5' }}>
              ← Blog
            </Link>
            <div className="flex flex-wrap gap-2 mb-5">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs font-600 px-2.5 py-1 rounded-full" style={getTagStyle(tag)}>{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl font-800 text-white mb-4" style={{ letterSpacing: '-0.025em', lineHeight: 1.15 }}>{post.titulo}</h1>
            <p className="text-base mb-6" style={{ color: '#8A9BB5' }}>{post.extracto}</p>
            <div className="flex items-center gap-4 text-sm" style={{ color: 'rgba(138,155,181,0.7)' }}>
              <span>{post.autor}</span>
              <span>·</span>
              <span>{fmtDate(post.fechaPublicacion)}</span>
              <span>·</span>
              <span>{post.tiempoLectura} min de lectura</span>
            </div>
          </div>
        </section>

        {/* Cover image */}
        {post.imagen && (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-2 mb-0">
            <img src={post.imagen} alt={post.titulo} className="w-full rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.06)', maxHeight: 420, objectFit: 'cover' }} />
          </div>
        )}

        {/* Content */}
        <section className="py-12" style={{ background: '#050D1A' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            {rendered}
          </div>
        </section>

        {/* CTA */}
        <section className="pb-16 pt-4" style={{ background: '#050D1A' }}>
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl p-8 text-center" style={{ background: 'rgba(0,196,160,0.05)', border: '1px solid rgba(0,196,160,0.2)' }}>
              <h3 className="text-xl font-800 text-white mb-2">¿Listo para construir tu plataforma?</h3>
              <p className="text-sm mb-6" style={{ color: '#8A9BB5' }}>Platiquemos sobre tu proyecto. Respondemos en menos de 24 horas.</p>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 px-8 py-3">
                Iniciar proyecto
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
