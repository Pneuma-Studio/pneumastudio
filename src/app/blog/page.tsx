import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { getPublishedPosts } from '@/lib/notion';

export const revalidate = 3600; // revalidate every hour

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pneumastudio.mx';

export const metadata = {
  title: 'Blog — Estrategia Digital, Ecommerce y Automatización',
  description: 'Artículos sobre ecommerce, automatización WhatsApp, desarrollo web y estrategia digital para negocios en México. Por Pneuma Studio, Monterrey.',
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: { title: 'Blog — Pneuma Studio', url: `${siteUrl}/blog` },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="section-padding relative overflow-hidden" style={{ background: '#050D1A' }}>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,196,160,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full" style={{ background: '#00C4A0' }} />
              <span className="label-tag text-primary">BLOG</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-800 text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
              Estrategia digital<br />
              <span style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #00C4A0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                sin filtros.
              </span>
            </h1>
            <p className="text-base max-w-xl" style={{ color: '#8A9BB5' }}>
              Ecommerce, automatización, desarrollo web y lo que realmente funciona para negocios en México.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="section-padding" style={{ background: '#0A1628' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {posts.length === 0 ? (
              <div className="text-center py-24">
                <p className="text-lg font-600 text-white mb-2">Próximamente</p>
                <p style={{ color: '#8A9BB5' }}>El primer artículo llegará pronto.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${encodeURIComponent(post.slug)}`} className="group block rounded-2xl overflow-hidden service-card" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
                    {post.imagen && (
                      <div className="h-48 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <img src={post.imagen} alt={post.titulo} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs font-600 px-2.5 py-1 rounded-full" style={{ background: 'rgba(0,196,160,0.1)', color: '#00C4A0', border: '1px solid rgba(0,196,160,0.2)' }}>{tag}</span>
                        ))}
                        <span className="text-xs ml-auto" style={{ color: '#8A9BB5' }}>{post.tiempoLectura} min</span>
                      </div>
                      <h2 className="text-lg font-700 text-white mb-2 group-hover:text-primary transition-colors duration-200" style={{ letterSpacing: '-0.01em' }}>{post.titulo}</h2>
                      <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A9BB5' }}>{post.extracto}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs" style={{ color: 'rgba(138,155,181,0.6)' }}>
                          {new Date(post.fechaPublicacion).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className="text-xs font-600" style={{ color: '#00C4A0' }}>Leer artículo →</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
