'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { businessApi, orderApi, callApi } from '@/lib/api';
import { useAuthStore } from '@/store/auth.store';
import { Card, EmptyState, ButtonLink } from '@/components/ui';
import { Building2, ShoppingBag, PhoneCall, TrendingUp, Plus, ArrowRight, Mic } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuthStore();

  const { data: bizData } = useQuery({
    queryKey: ['businesses'],
    queryFn: () => businessApi.list().then((r) => r.data),
  });

  const { data: orderData } = useQuery({
    queryKey: ['orders-recent'],
    queryFn: () => orderApi.list({ page: 1 }).then((r) => r.data),
  });

  const { data: callData } = useQuery({
    queryKey: ['calls-recent'],
    queryFn: () => callApi.list({ page: 1 }).then((r) => r.data),
  });

  const businesses = bizData?.businesses || [];
  const orders = orderData?.orders || [];
  const calls = callData?.calls || [];

  const totalRevenue = orders
    .filter((o: any) => ['PAID', 'CONFIRMED', 'PREPARING', 'READY', 'DELIVERED'].includes(o.status))
    .reduce((sum: number, o: any) => sum + o.totalAmount, 0);

  const stats = [
    { label: 'Businesses', value: businesses.length, icon: Building2, color: 'text-primary-light', bg: 'bg-primary/15', href: '/dashboard/businesses' },
    { label: 'Total Orders', value: orders.length, icon: ShoppingBag, color: 'text-emerald-400', bg: 'bg-emerald-500/15', href: '/dashboard/orders' },
    { label: 'Total Calls', value: calls.length, icon: PhoneCall, color: 'text-accent-purple', bg: 'bg-accent-purple/15', href: '/dashboard/calls' },
    { label: 'Revenue', value: `₦${totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/15', href: '/dashboard/orders' },
  ];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
          Good morning, {user?.name?.split(' ')[0]}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Here&apos;s what&apos;s happening with your voice receptionist today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="card rounded-xl p-5 border border-white/[0.08] hover:border-white/10 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-4`}>
                <Icon size={18} className={stat.color} />
              </div>
              <div className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                {stat.value}
              </div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card padding="md" className="rounded-xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Recent Orders
            </h2>
            <Link
              href="/dashboard/orders"
              className="text-xs text-primary-light hover:text-primary flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {orders.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <ShoppingBag size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {orders.slice(0, 5).map((order: any) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium text-white">{order.callerName}</div>
                    <div className="text-xs text-slate-500">{order.business?.name || 'N/A'}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">₦{order.totalAmount.toLocaleString()}</div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md ${
                        order.status === 'PAID'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : order.status === 'PENDING_PAYMENT'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-primary/20 text-primary-light'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card padding="md" className="rounded-xl border border-white/[0.08]">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Recent Calls
            </h2>
            <Link
              href="/dashboard/calls"
              className="text-xs text-primary-light hover:text-primary flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight size={12} />
            </Link>
          </div>
          {calls.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <PhoneCall size={28} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No calls yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {calls.slice(0, 5).map((call: any) => (
                <div
                  key={call.id}
                  className="flex items-center justify-between py-2.5 border-b border-white/[0.06] last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent-purple/15 flex items-center justify-center">
                      <Mic size={12} className="text-accent-purple" />
                    </div>
                    <div>
                      <div className="text-sm text-white">{call.callerNumber || 'Unknown'}</div>
                      <div className="text-xs text-slate-500">{call.business?.name || 'Unassigned'}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">{call.duration ? `${call.duration}s` : '—'}</div>
                    <div className="text-xs text-slate-500">{call.language?.toUpperCase()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {businesses.length === 0 && (
        <div className="mt-8">
          <EmptyState
            icon={Building2}
            title="Add your first business"
            description="Set up your business profile, catalogue, and VAPI assistant to start receiving AI-handled calls."
            action={
              <ButtonLink href="/dashboard/businesses/new" icon={<Plus size={16} />}>
                Create Business
              </ButtonLink>
            }
          />
        </div>
      )}
    </div>
  );
}
