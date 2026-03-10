'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import {
  LayoutDashboard,
  Building2,
  ShoppingBag,
  PhoneCall,
  Settings,
  LogOut,
  Plus,
  Mic,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, exact: true },
  { label: 'Businesses', href: '/dashboard/businesses', icon: Building2 },
  { label: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { label: 'Call Logs', href: '/dashboard/calls', icon: PhoneCall },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, fetchMe } = useAuthStore();

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }
      fetchMe();
    }
  }, []);

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex h-screen bg-[#0F172A] overflow-hidden">
      <aside className="w-56 flex-shrink-0 flex flex-col border-r border-white/[0.08] bg-[#0F172A]">
        <div className="p-5 border-b border-white/[0.08]">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Mic size={16} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              VoiceBridge
            </span>
          </Link>
        </div>

        <div className="px-3 pt-4 pb-2">
          <Link
            href="/dashboard/businesses/new"
            className="flex items-center gap-2 w-full bg-primary/15 hover:bg-primary/25 border border-primary/20 text-primary-light px-3 py-2.5 rounded-lg text-sm font-medium transition-all group"
          >
            <Plus size={14} />
            Add Business
            <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-primary/15 text-primary-light'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/[0.08]">
          <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center text-white text-xs font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user?.name || 'Loading...'}</div>
              <div className="text-xs text-slate-500 truncate">{user?.email || ''}</div>
            </div>
            <button
              onClick={logout}
              className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded"
              aria-label="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto bg-[#0F172A]">
        {children}
      </main>
    </div>
  );
}
