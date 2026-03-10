'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { businessApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { ArrowLeft, Mic, CreditCard, Bell, Trash2, Copy, Check } from 'lucide-react';

export default function BusinessSettingsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState<any>({});
  const [activeTab, setActiveTab] = useState<'general' | 'vapi' | 'payment' | 'danger'>('general');

  const { data } = useQuery({
    queryKey: ['business', id],
    queryFn: () => businessApi.get(id as string).then(r => r.data),
  });

  useEffect(() => {
    if (data?.business) setForm(data.business);
  }, [data]);

  const updateMutation = useMutation({
    mutationFn: (d: any) => businessApi.update(id as string, d),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business', id] });
      toast.success('Settings saved!');
    },
    onError: (e: any) => toast.error(e?.response?.data?.error || 'Save failed.'),
  });

  const deleteMutation = useMutation({
    mutationFn: () => businessApi.delete(id as string),
    onSuccess: () => {
      window.location.href = '/dashboard/businesses';
    },
  });

  const set = (k: string, v: any) => setForm((p: any) => ({ ...p, [k]: v }));
  const save = () => updateMutation.mutate(form);

  const copyEndpoint = (path: string) => {
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    navigator.clipboard.writeText(`${base}/api${path}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'vapi', label: 'VAPI / Voice' },
    { id: 'payment', label: 'Payments' },
    { id: 'danger', label: 'Danger Zone' },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-6">
        <Link href={`/dashboard/businesses/${id}`} className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
          <ArrowLeft size={15} /> Back to {form.name || 'Business'}
        </Link>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Business Settings</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-white/[0.04] p-1 rounded-lg border border-white/[0.08]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-primary text-white' : 'text-slate-400 hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General */}
      {activeTab === 'general' && (
        <div className="space-y-4">
          <div className="card rounded-xl p-6 space-y-4 border border-white/[0.08]">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Business Name</label>
              <input value={form.name || ''} onChange={e => set('name', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Phone</label>
              <input value={form.phone || ''} onChange={e => set('phone', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email</label>
              <input value={form.email || ''} onChange={e => set('email', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Escalation Phone</label>
              <input value={form.escalationPhone || ''} onChange={e => set('escalationPhone', e.target.value)}
                placeholder="Transfer here when AI can't help" className="input-field" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Order Webhook URL</label>
              <input value={form.orderWebhookUrl || ''} onChange={e => set('orderWebhookUrl', e.target.value)}
                placeholder="https://..." className="input-field" />
            </div>
          </div>
          <button onClick={save} disabled={updateMutation.isPending}
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white py-3 rounded-lg text-sm font-medium transition-all">
            {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* VAPI */}
      {activeTab === 'vapi' && (
        <div className="space-y-4">
          <div className="card rounded-xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4">
              <Mic size={18} className="text-primary-light" />
              <h2 className="font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>VAPI Configuration</h2>
            </div>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-5 text-sm text-primary-light">
              <strong>How to set up:</strong> Create an assistant on vapi.ai, copy the Assistant ID below. 
              Use the API endpoints from this page as your tool call URLs in VAPI.
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">VAPI Assistant ID</label>
                <input value={form.vapiAssistantId || ''} onChange={e => set('vapiAssistantId', e.target.value)}
                  placeholder="e.g. asst_xxxxxxxxxxxxxxxx" className="input-field font-mono text-sm" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">VAPI Phone Number</label>
                <input value={form.vapiPhoneNumber || ''} onChange={e => set('vapiPhoneNumber', e.target.value)}
                  placeholder="+1 555 000 0000" className="input-field" />
              </div>
              <div className="flex items-center justify-between py-3 px-4 bg-white/5 rounded-xl">
                <div>
                  <div className="text-sm text-white font-medium">Enable VAPI</div>
                  <div className="text-xs text-slate-500">Activate AI voice calls for this business</div>
                </div>
                <button type="button" onClick={() => set('vapiEnabled', !form.vapiEnabled)}
                  className={`w-12 h-6 rounded-full transition-all relative ${form.vapiEnabled ? 'bg-primary' : 'bg-slate-700'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${form.vapiEnabled ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* API Endpoints */}
          <div className="card rounded-xl p-6 border border-white/[0.08]">
            <h3 className="font-semibold text-white mb-3 text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>
              Tool Call Endpoints (use in VAPI assistant)
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Lookup Item', path: '/vapi/tools/lookup-item' },
                { label: 'Search Businesses', path: '/vapi/tools/search-businesses' },
                { label: 'Create Order', path: '/vapi/tools/create-order' },
                { label: 'Get Business Info', path: '/vapi/tools/get-business-info' },
                { label: 'Log Escalation', path: '/vapi/tools/log-escalation' },
              ].map(ep => (
                <div key={ep.path} className="flex items-center justify-between bg-white/3 rounded-lg px-3 py-2">
                  <div>
                    <span className="text-xs text-slate-400">{ep.label}</span>
                    <div className="text-xs text-primary-light font-mono">/api{ep.path}</div>
                  </div>
                  <button onClick={() => copyEndpoint(ep.path)} className="text-slate-500 hover:text-white transition-colors">
                    {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button onClick={save} disabled={updateMutation.isPending}
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white py-3 rounded-lg text-sm font-medium transition-all">
            {updateMutation.isPending ? 'Saving...' : 'Save VAPI Settings'}
          </button>
        </div>
      )}

      {/* Payments */}
      {activeTab === 'payment' && (
        <div className="space-y-4">
          <div className="card rounded-xl p-6 border border-white/[0.08]">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard size={18} className="text-emerald-400" />
              <h2 className="font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>Paystack Settings</h2>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4 mb-5 text-sm text-emerald-400">
              Payments are processed through Paystack. VoiceBridge takes a 5% platform fee per transaction.
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Paystack Subaccount Code</label>
                <input value={form.paystackSubAccountCode || ''} onChange={e => set('paystackSubAccountCode', e.target.value)}
                  placeholder="ACCT_xxxxxxxxxxxxxxxx" className="input-field font-mono text-sm" />
                <p className="text-xs text-slate-500 mt-1">Get this from Paystack Dashboard → Settings → Subaccounts</p>
              </div>
            </div>
          </div>
          <button onClick={save} disabled={updateMutation.isPending}
            className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white py-3 rounded-lg text-sm font-medium transition-all">
            {updateMutation.isPending ? 'Saving...' : 'Save Payment Settings'}
          </button>
        </div>
      )}

      {/* Danger Zone */}
      {activeTab === 'danger' && (
        <div className="card rounded-xl p-6 border border-red-500/20">
          <h2 className="font-bold text-red-400 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Danger Zone</h2>
          <p className="text-sm text-slate-400 mb-5">
            Deleting this business will permanently remove it along with all catalogue items, orders, and call logs. This action cannot be undone.
          </p>
          <button onClick={() => {
            if (confirm('Are you absolutely sure? This cannot be undone.')) {
              deleteMutation.mutate();
            }
          }} className="flex items-center gap-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
            <Trash2 size={14} /> Delete Business
          </button>
        </div>
      )}

      <style jsx global>{`
        .input-field { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 14px; color: white; font-size: 14px; transition: all 0.2s; outline: none; font-family: 'DM Sans', sans-serif; }
        .input-field:focus { border-color: #635bff; box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.2); }
        .input-field::placeholder { color: #64748b; }
      `}</style>
    </div>
  );
}
