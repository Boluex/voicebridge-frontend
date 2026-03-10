'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { PageHeader, EmptyState, Card, Badge } from '@/components/ui';
import { ShoppingBag, ChevronDown } from 'lucide-react';

const statusConfig: Record<string, { variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple'; label: string }> = {
  PENDING_PAYMENT: { variant: 'warning', label: 'Pending Payment' },
  PAID: { variant: 'success', label: 'Paid' },
  CONFIRMED: { variant: 'info', label: 'Confirmed' },
  PREPARING: { variant: 'purple', label: 'Preparing' },
  READY: { variant: 'info', label: 'Ready' },
  DELIVERED: { variant: 'default', label: 'Delivered' },
  CANCELLED: { variant: 'danger', label: 'Cancelled' },
};

export default function OrdersPage() {
  const [filter, setFilter] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['orders', filter],
    queryFn: () => orderApi.list({ status: filter || undefined }).then((r) => r.data),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => orderApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order status updated.');
    },
  });

  const orders = data?.orders || [];

  return (
    <div className="p-6 md:p-8">
      <PageHeader title="Orders" description="Manage orders placed through voice calls." />

      <div className="flex gap-2 mb-6 flex-wrap">
        {['', 'PENDING_PAYMENT', 'PAID', 'CONFIRMED', 'PREPARING', 'DELIVERED', 'CANCELLED'].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === s ? 'bg-primary text-white' : 'bg-white/[0.06] text-slate-400 hover:text-white border border-white/[0.08]'}`}
          >
            {s === '' ? 'All' : statusConfig[s]?.label || s}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} padding="md" className="h-20 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="No orders"
          description="Orders placed through voice calls will appear here."
        />
      ) : (
        <div className="space-y-3">
          {orders.map((order: any) => {
            const sc = statusConfig[order.status] || statusConfig.CANCELLED;
            const expanded = expandedOrder === order.id;
            return (
              <Card key={order.id} padding="none" className="rounded-xl border border-white/[0.08] overflow-hidden">
                <button
                  type="button"
                  className="flex w-full items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpandedOrder(expanded ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                      <ShoppingBag size={16} className="text-slate-400" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{order.callerName}</div>
                      <div className="text-xs text-slate-400">
                        {order.business?.name} · #{order.id.slice(0, 8).toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant={sc.variant}>{sc.label}</Badge>
                    <span className="text-sm font-semibold text-white tabular-nums">₦{order.totalAmount.toLocaleString()}</span>
                    <ChevronDown size={16} className={`text-slate-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {expanded && (
                  <div className="px-5 pb-5 border-t border-white/[0.06]">
                    <div className="grid grid-cols-2 gap-4 my-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Customer</div>
                        <div className="text-sm text-white">{order.callerName}</div>
                        <div className="text-sm text-slate-400">{order.callerPhone}</div>
                        {order.callerEmail && <div className="text-sm text-slate-400">{order.callerEmail}</div>}
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Delivery</div>
                        <div className="text-sm text-slate-400">{order.deliveryAddress || 'Not specified'}</div>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 mb-2">Items</div>
                      {order.items?.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm py-1">
                          <span className="text-slate-300">
                            {item.quantity}× {item.name}
                          </span>
                          <span className="text-white tabular-nums">₦{(item.unitPrice * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    {order.status !== 'DELIVERED' && order.status !== 'CANCELLED' && (
                      <div className="flex flex-wrap gap-2">
                        {['CONFIRMED', 'PREPARING', 'READY', 'DELIVERED'].map(
                          (s) =>
                            order.status !== s && (
                              <button
                                key={s}
                                type="button"
                                onClick={() => statusMutation.mutate({ id: order.id, status: s })}
                                className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 text-slate-300 transition-all border border-white/[0.08]"
                              >
                                → {statusConfig[s]?.label}
                              </button>
                            )
                        )}
                        <button
                          type="button"
                          onClick={() => statusMutation.mutate({ id: order.id, status: 'CANCELLED' })}
                          className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all ml-auto"
                        >
                          Cancel Order
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
