'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import CommandPalette from '@/components/admin/CommandPalette';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    label: 'Overview',
    href: '/admin/dashboard',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Clientes',
    href: '/admin/clientes',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Pagos',
    href: '/admin/pagos',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    label: 'Disponibilidad',
    href: '/admin/disponibilidad',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Reportes',
    href: '/admin/reportes',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

const PAGE_TITLES: Record<string, string> = {
  '/admin/dashboard': 'Overview',
  '/admin/clientes': 'Clientes',
  '/admin/clientes/nuevo': 'Nuevo Cliente',
  '/admin/pagos': 'Pagos',
  '/admin/pagos/nuevo': 'Registrar Pago',
  '/admin/disponibilidad': 'Disponibilidad',
  '/admin/reportes': 'Reportes',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  async function handleSignOut() {
    await fetch('/api/admin/signout', { method: 'POST' });
    router.replace('/admin/login');
    router.refresh();
  }

  const pageTitle = PAGE_TITLES[pathname] ?? (pathname.includes('/clientes/') ? 'Detalle Cliente' : 'Admin');

  return (
    <div className="min-h-screen flex" style={{ background: '#060E1C', color: '#FFFFFF', fontFamily: "var(--font-inter, 'Inter', sans-serif)" }}>
      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{ position: 'absolute', width: 700, height: 700, background: 'radial-gradient(circle, rgba(0,196,160,0.05) 0%, transparent 65%)', top: -250, right: -150, borderRadius: '50%', filter: 'blur(60px)' }} />
        <div style={{ position: 'absolute', width: 500, height: 500, background: 'radial-gradient(circle, rgba(30,64,175,0.07) 0%, transparent 65%)', bottom: -100, left: -100, borderRadius: '50%', filter: 'blur(60px)' }} />
      </div>

      <CommandPalette />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto`}
        style={{
          width: '260px',
          minWidth: '260px',
          transform: sidebarOpen ? 'translateX(0)' : undefined,
          background: 'rgba(8,18,34,0.98)',
          borderRight: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col px-5 py-4 gap-0.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Image
            src="/assets/images/pneuma-studio-logo.png"
            alt="Pneuma Studio"
            width={130}
            height={130}
            className="object-contain"
            priority
          />
          <div className="text-xs font-500 -mt-1" style={{ color: 'rgba(0,196,160,0.7)' }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 flex flex-col gap-1 overflow-y-auto">
          {/* Label */}
          <p className="text-xs font-600 px-3 mb-2 tracking-widest" style={{ color: 'rgba(138,155,181,0.5)' }}>
            MENÚ
          </p>

          {navItems.map(item => {
            const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-500 transition-all duration-150 relative group"
                style={{
                  color: isActive ? '#FFFFFF' : '#8A9BB5',
                  background: isActive ? 'rgba(0,196,160,0.12)' : 'transparent',
                }}
                onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; }}
                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {/* Left accent bar */}
                {isActive && (
                  <div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full"
                    style={{ background: '#00C4A0' }}
                  />
                )}
                <span style={{ color: isActive ? '#00C4A0' : 'inherit' }}>
                  {item.icon}
                </span>
                <span className="font-500">{item.label}</span>
              </Link>
            );
          })}

          {/* Divider */}
          <div className="mx-3 my-3" style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }} />

          {/* New client shortcut */}
          <Link
            href="/admin/clientes/nuevo"
            prefetch={false}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 transition-all duration-150"
            style={{
              color: pathname === '/admin/clientes/nuevo' ? '#00C4A0' : '#8A9BB5',
              background: pathname === '/admin/clientes/nuevo' ? 'rgba(0,196,160,0.1)' : 'rgba(0,196,160,0.05)',
              border: '1px solid rgba(0,196,160,0.1)',
            }}
          >
            <div
              className="w-5 h-5 rounded-md flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,196,160,0.15)' }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#00C4A0" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </div>
            Nuevo cliente
          </Link>
        </nav>

        {/* Bottom — sign out */}
        <div className="px-3 pb-5 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex items-center gap-3 px-3 py-2 mb-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: 'rgba(0,196,160,0.1)', border: '1px solid rgba(0,196,160,0.2)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00C4A0" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-600 text-white truncate">Admin</p>
              <p className="text-xs truncate" style={{ color: '#8A9BB5' }}>pneumastudiomx</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-500 w-full transition-all duration-150"
            style={{ color: '#8A9BB5' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#EF4444'; (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#8A9BB5'; (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className="relative z-10 flex-1 flex flex-col min-w-0">
        {/* Desktop top bar */}
        <header
          className="hidden lg:flex items-center justify-between px-6 py-3.5"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(6,14,28,0.8)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: '#8A9BB5' }}>Admin</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8A9BB5" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
            <span className="text-sm font-600 text-white">{pageTitle}</span>
          </div>
          <button
            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, bubbles: true }))}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-all"
            style={{ color: '#8A9BB5', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,196,160,0.3)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Buscar
            <kbd style={{ background: 'rgba(255,255,255,0.06)', padding: '1px 5px', borderRadius: 4, fontFamily: 'monospace', color: '#6B7280', marginLeft: 4 }}>⌘K</kbd>
          </button>
        </header>

        {/* Mobile header */}
        <header
          className="flex items-center justify-between px-4 py-3.5 lg:hidden"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(8,18,34,0.98)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg"
            style={{ color: '#8A9BB5', background: 'rgba(255,255,255,0.04)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="text-sm font-700 text-white">{pageTitle}</span>
          <div className="w-8" />
        </header>

        <main className="flex-1 overflow-auto p-5 lg:p-7">
          {children}
        </main>
      </div>

      {/* Mobile FAB */}
      <Link
        href="/admin/pagos/nuevo"
        prefetch={false}
        className="fixed bottom-6 right-6 lg:hidden w-14 h-14 rounded-full flex items-center justify-center shadow-lg z-10"
        style={{ background: '#00C4A0', color: '#050D1A', boxShadow: '0 0 24px rgba(0,196,160,0.4)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </Link>
    </div>
  );
}
