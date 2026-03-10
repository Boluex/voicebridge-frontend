'use client';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { businessApi } from '@/lib/api';
import { PageHeader, EmptyState, ButtonLink, Badge, Card } from '@/components/ui';
import { Plus, Building2, Phone, MapPin, Mic, ArrowRight, Settings } from 'lucide-react';

const categoryColors: Record<string, 'default' | 'success' | 'warning' | 'info' | 'purple'> = {
  RESTAURANT: 'warning',
  PLUMBER: 'info',
  SALON: 'purple',
  PHARMACY: 'success',
  GROCERY: 'warning',
  HOTEL: 'purple',
  OTHER: 'default',
};

export default function BusinessesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['businesses'],
    queryFn: () => businessApi.list().then((r) => r.data),
  });

  const businesses = data?.businesses || [];

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Businesses"
        description="Manage your registered businesses and their AI receptionists."
        action={
          <ButtonLink href="/dashboard/businesses/new" icon={<Plus size={16} />}>
            Add Business
          </ButtonLink>
        }
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md" className="animate-pulse">
              <div className="h-5 bg-white/5 rounded w-1/2 mb-3" />
              <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
            </Card>
          ))}
        </div>
      ) : businesses.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="No businesses yet"
          description="Add your first business to start using your AI voice receptionist."
          action={
            <ButtonLink href="/dashboard/businesses/new" icon={<Plus size={15} />}>
              Create Your First Business
            </ButtonLink>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {businesses.map((biz: any) => (
            <Card
              key={biz.id}
              padding="md"
              className="rounded-xl border border-white/[0.08] hover:border-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant={categoryColors[biz.category] || 'default'} className="mb-2">
                    {biz.category}
                  </Badge>
                  <h3 className="text-base font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
                    {biz.name}
                  </h3>
                </div>
                <div
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 ${biz.vapiEnabled ? 'bg-emerald-400 voice-pulse' : 'bg-slate-600'}`}
                  title={biz.vapiEnabled ? 'VAPI Active' : 'VAPI Inactive'}
                />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone size={13} />
                  {biz.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin size={13} />
                  {biz.city}, {biz.country}
                </div>
                {biz.vapiPhoneNumber && (
                  <div className="flex items-center gap-2 text-sm text-primary-light">
                    <Mic size={13} />
                    {biz.vapiPhoneNumber}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                <span>{biz._count?.catalogueItems || 0} items</span>
                <span>·</span>
                <span>{biz._count?.orders || 0} orders</span>
                <span>·</span>
                <span>{biz._count?.callLogs || 0} calls</span>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/dashboard/businesses/${biz.id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-white/10 hover:bg-white/5 text-slate-300 py-2 rounded-lg text-xs font-medium transition-all"
                >
                  Manage <ArrowRight size={11} />
                </Link>
                <Link
                  href={`/dashboard/businesses/${biz.id}/settings`}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 hover:bg-white/5 text-slate-400 rounded-lg transition-all"
                >
                  <Settings size={14} />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
