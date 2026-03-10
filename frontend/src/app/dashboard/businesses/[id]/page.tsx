'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { businessApi, catalogueApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { Card, Badge, Button } from '@/components/ui';
import { ArrowLeft, Plus, Package, Phone, Mic, Settings, Trash2, ToggleLeft, ToggleRight, ShoppingBag } from 'lucide-react';

export default function BusinessDetailPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({ name: '', description: '', price: '', category: '', tags: '' });

  const { data: bizData, isLoading } = useQuery({
    queryKey: ['business', id],
    queryFn: () => businessApi.get(id as string).then(r => r.data),
  });

  const { data: catalogueData, refetch: refetchCatalogue } = useQuery({
    queryKey: ['catalogue', id],
    queryFn: () => catalogueApi.list(id as string).then(r => r.data),
  });

  const { data: statsData } = useQuery({
    queryKey: ['business-stats', id],
    queryFn: () => businessApi.stats(id as string).then(r => r.data),
  });

  const addItemMutation = useMutation({
    mutationFn: (data: any) => catalogueApi.create(id as string, data),
    onSuccess: () => {
      refetchCatalogue();
      setShowAddItem(false);
      setNewItem({ name: '', description: '', price: '', category: '', tags: '' });
      toast.success('Item added to catalogue!');
    },
    onError: (err: any) => toast.error(err?.response?.data?.error || 'Failed to add item.'),
  });

  const toggleMutation = useMutation({
    mutationFn: (itemId: string) => catalogueApi.toggle(itemId),
    onSuccess: () => refetchCatalogue(),
  });

  const deleteMutation = useMutation({
    mutationFn: (itemId: string) => catalogueApi.delete(itemId),
    onSuccess: () => { refetchCatalogue(); toast.success('Item deleted.'); },
  });

  if (isLoading) {
    return <div className="p-8 text-slate-400">Loading...</div>;
  }

  const business = bizData?.business;
  const items = catalogueData?.items || [];
  const grouped = catalogueData?.grouped || {};
  const stats = statsData?.stats;
  const recentOrders = statsData?.recentOrders || [];

  return (
    <div className="p-6 md:p-8">
      <div className="mb-6">
        <Link href="/dashboard/businesses" className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft size={15} /> All Businesses
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{business?.name}</h1>
              <Badge variant={business?.vapiEnabled ? 'success' : 'default'}>
                {business?.vapiEnabled ? 'VAPI Active' : 'VAPI Inactive'}
              </Badge>
            </div>
            <p className="text-slate-400 text-sm mt-1">{business?.category} · {business?.city}</p>
          </div>
          <Link
            href={`/dashboard/businesses/${id}/settings`}
            className="flex items-center gap-2 border border-white/10 hover:bg-white/5 text-slate-300 px-4 py-2 rounded-lg text-sm transition-all"
          >
            <Settings size={14} /> Settings
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: stats?.totalOrders || 0 },
          { label: 'Revenue', value: `₦${(stats?.totalRevenue || 0).toLocaleString()}` },
          { label: 'Total Calls', value: stats?.totalCalls || 0 },
        ].map((s) => (
          <Card key={s.label} padding="md" className="rounded-xl border border-white/[0.08]">
            <div className="text-xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>{s.value}</div>
            <div className="text-xs text-slate-400">{s.label}</div>
          </Card>
        ))}
      </div>

      {!business?.vapiAssistantId && (
        <div className="card rounded-xl p-5 mb-6 border border-primary/20 bg-primary/5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Mic size={18} className="text-primary-light" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white text-sm">VAPI Not Configured</div>
              <div className="text-xs text-slate-400">Connect your VAPI assistant to enable AI voice calls for this business.</div>
            </div>
            <Link
              href={`/dashboard/businesses/${id}/settings`}
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg text-xs font-medium transition-all"
            >
              Configure
            </Link>
          </div>
        </div>
      )}

      <Card padding="md" className="rounded-xl border border-white/[0.08]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              Catalogue <span className="text-slate-500 font-normal text-sm ml-1">({items.length} items)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Items the AI can look up and order for callers.</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            icon={<Plus size={14} />}
            onClick={() => setShowAddItem(!showAddItem)}
          >
            Add Item
          </Button>
        </div>

        {showAddItem && (
          <div className="bg-white/[0.04] rounded-lg p-5 mb-5 border border-white/[0.08]">
            <h3 className="text-sm font-semibold text-white mb-4">New Catalogue Item</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input value={newItem.name} onChange={(e) => setNewItem((p) => ({ ...p, name: e.target.value }))} placeholder="Item name *" className="input-field" />
              <input value={newItem.price} onChange={(e) => setNewItem((p) => ({ ...p, price: e.target.value }))} placeholder="Price (₦) *" type="number" className="input-field" />
              <input value={newItem.category} onChange={(e) => setNewItem((p) => ({ ...p, category: e.target.value }))} placeholder="Category (e.g. Main Course)" className="input-field" />
              <input value={newItem.tags} onChange={(e) => setNewItem((p) => ({ ...p, tags: e.target.value }))} placeholder="Tags (comma-separated)" className="input-field" />
            </div>
            <textarea value={newItem.description} onChange={(e) => setNewItem((p) => ({ ...p, description: e.target.value }))} placeholder="Description (optional)" rows={2} className="input-field w-full mb-3 resize-none" />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  addItemMutation.mutate({
                    ...newItem,
                    price: parseFloat(newItem.price),
                    tags: newItem.tags.split(',').map((t) => t.trim()).filter(Boolean),
                  })
                }
                disabled={!newItem.name || !newItem.price || addItemMutation.isPending}
                className="bg-primary hover:bg-primary-hover disabled:opacity-50 text-white px-5 py-2 rounded-lg text-sm font-medium transition-all"
              >
                {addItemMutation.isPending ? 'Adding...' : 'Add Item'}
              </button>
              <Button variant="secondary" size="sm" onClick={() => setShowAddItem(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <Package size={28} className="mx-auto mb-2 opacity-40" />
            <p className="text-sm">No items yet. Add items so the AI can handle orders.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(grouped).map(([cat, catItems]: [string, any]) => (
              <div key={cat}>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1">{cat || 'Uncategorised'}</div>
                <div className="space-y-2">
                  {catItems.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between py-3 px-4 rounded-lg bg-white/[0.03] hover:bg-white/[0.05] border border-white/[0.06]">
                      <div className="flex items-center gap-4">
                        <button type="button" onClick={() => toggleMutation.mutate(item.id)} className={`transition-colors ${item.isAvailable ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-600 hover:text-slate-400'}`}>
                          {item.isAvailable ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                        </button>
                        <div>
                          <div className="text-sm font-medium text-white">{item.name}</div>
                          {item.description && <div className="text-xs text-slate-500 truncate max-w-xs">{item.description}</div>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-semibold text-white">₦{item.price.toLocaleString()}</span>
                        <span className={`text-xs ${item.isAvailable ? 'text-emerald-400' : 'text-red-400'}`}>{item.isAvailable ? 'Available' : 'Out of stock'}</span>
                        <button type="button" onClick={() => { if (confirm('Delete this item?')) deleteMutation.mutate(item.id); }} className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <style jsx global>{`
        .input-field { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; color: white; font-size: 14px; transition: all 0.2s; outline: none; font-family: 'DM Sans', sans-serif; }
        .input-field:focus { border-color: #635bff; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.2); }
        .input-field::placeholder { color: #64748b; }
        textarea.input-field { resize: vertical; }
      `}</style>
    </div>
  );
}
