'use client';
import { useQuery } from '@tanstack/react-query';
import { callApi } from '@/lib/api';
import { PageHeader, EmptyState, Card, Badge } from '@/components/ui';
import { PhoneCall, Globe, ArrowUpRight, Mic } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const intentVariants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'> = {
  ORDER: 'success',
  INQUIRY: 'info',
  COMPLAINT: 'danger',
  ESCALATION: 'warning',
  RESEARCH: 'purple',
  OTHER: 'default',
};

export default function CallsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['calls'],
    queryFn: () => callApi.list().then((r) => r.data),
  });

  const calls = data?.calls || [];
  const total = data?.total || 0;

  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Call Logs"
        description={`${total} total calls handled by your AI receptionist.`}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Calls', value: calls.length },
          { label: 'Orders', value: calls.filter((c: any) => c.intent === 'ORDER').length },
          { label: 'Escalated', value: calls.filter((c: any) => c.wasTransferred).length },
          {
            label: 'Avg Duration',
            value: calls.length > 0 ? `${Math.round(calls.reduce((s: number, c: any) => s + (c.duration || 0), 0) / calls.length)}s` : '—',
          },
        ].map((s) => (
          <Card key={s.label} padding="md" className="rounded-xl border border-white/[0.08]">
            <div className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              {s.value}
            </div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </Card>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} padding="md" className="h-16 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : calls.length === 0 ? (
        <EmptyState
          icon={PhoneCall}
          title="No calls yet"
          description="Calls handled by your AI receptionist will appear here."
        />
      ) : (
        <Card padding="none" className="rounded-xl border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08]">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Caller</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Business</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Intent</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Duration</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Language</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {calls.map((call: any) => (
                  <tr key={call.id} className="border-b border-white/[0.06] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent-purple/15 flex items-center justify-center">
                          <Mic size={11} className="text-accent-purple" />
                        </div>
                        <span className="text-sm text-white">{call.callerNumber || 'Unknown'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-400">{call.business?.name || '—'}</td>
                    <td className="px-5 py-3">
                      {call.intent ? (
                        <Badge variant={intentVariants[call.intent] || 'default'}>{call.intent}</Badge>
                      ) : (
                        <span className="text-slate-600 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-sm text-slate-400 text-right tabular-nums">
                      {call.duration ? `${call.duration}s` : '—'}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Globe size={11} />
                        {call.language?.toUpperCase() || 'EN'}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-xs text-slate-500">
                      {formatDistanceToNow(new Date(call.createdAt), { addSuffix: true })}
                    </td>
                    <td className="px-5 py-3">
                      {call.wasTransferred && (
                        <span className="flex items-center gap-1 text-xs text-amber-400">
                          <ArrowUpRight size={11} /> Escalated
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
