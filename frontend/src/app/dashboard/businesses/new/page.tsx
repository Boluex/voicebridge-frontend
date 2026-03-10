'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { businessApi } from '@/lib/api';
import toast from 'react-hot-toast';
import { Card } from '@/components/ui';
import { ArrowLeft, Building2 } from 'lucide-react';

const categories = ['RESTAURANT', 'PLUMBER', 'SALON', 'PHARMACY', 'GROCERY', 'HOTEL', 'LAUNDRY', 'ELECTRICIAN', 'MECHANIC', 'OTHER'];

export default function NewBusinessPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: 'RESTAURANT',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: 'NG',
    escalationPhone: '',
    escalationEmail: '',
    orderWebhookUrl: '',
  });

  const mutation = useMutation({
    mutationFn: (data: any) => businessApi.create(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['businesses'] });
      toast.success('Business created! Now add your catalogue.');
      router.push(`/dashboard/businesses/${res.data.business.id}`);
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.error || 'Failed to create business.');
    },
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      <div className="mb-8">
        <Link
          href="/dashboard/businesses"
          className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft size={15} /> Back to Businesses
        </Link>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
          Add Business
        </h1>
        <p className="text-slate-400 text-sm mt-1">Register your business to deploy an AI voice receptionist.</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate(form);
        }}
        className="space-y-6"
      >
        <Card padding="md" className="rounded-xl border border-white/[0.08]">
          <h2 className="font-semibold text-white mb-4 flex items-center gap-2" style={{ fontFamily: 'Syne, sans-serif' }}>
            <Building2 size={16} className="text-primary-light" /> Basic Information
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Business Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Mama's Kitchen"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Category *</label>
              <select required value={form.category} onChange={(e) => set('category', e.target.value)} className="input-field">
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
                placeholder="Brief description of your business..."
                rows={3}
                className="input-field resize-none"
              />
            </div>
          </div>
        </Card>

        <Card padding="md" className="rounded-xl border border-white/[0.08]">
          <h2 className="font-semibold text-white mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>
            Contact Details
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Phone Number *</label>
                <input
                  required
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  placeholder="business@email.com"
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Address *</label>
              <input
                required
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                placeholder="123 Main Street"
                className="input-field"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">City *</label>
                <input
                  required
                  value={form.city}
                  onChange={(e) => set('city', e.target.value)}
                  placeholder="Lagos"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1.5">Country</label>
                <input value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="NG" className="input-field" />
              </div>
            </div>
          </div>
        </Card>

        <Card padding="md" className="rounded-xl border border-white/[0.08]">
          <h2 className="font-semibold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
            Escalation Settings
          </h2>
          <p className="text-sm text-slate-400 mb-4">Where to transfer calls when the AI can&apos;t help.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Escalation Phone</label>
              <input
                value={form.escalationPhone}
                onChange={(e) => set('escalationPhone', e.target.value)}
                placeholder="Human agent phone number"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Order Webhook URL</label>
              <input
                value={form.orderWebhookUrl}
                onChange={(e) => set('orderWebhookUrl', e.target.value)}
                placeholder="https://your-system.com/webhooks/orders"
                className="input-field"
              />
            </div>
          </div>
        </Card>

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-primary hover:bg-primary-hover disabled:opacity-50 text-white py-3 rounded-lg font-medium text-sm transition-all"
        >
          {mutation.isPending ? 'Creating business...' : 'Create Business'}
        </button>
      </form>

      <style jsx global>{`
        .input-field {
          width: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 10px 14px;
          color: white;
          font-size: 14px;
          transition: all 0.2s;
          outline: none;
          font-family: 'DM Sans', sans-serif;
        }
        .input-field:focus {
          border-color: #635bff;
          box-shadow: 0 0 0 3px rgba(99, 91, 255, 0.2);
        }
        .input-field::placeholder {
          color: #64748b;
        }
        .input-field option {
          background: #1e293b;
        }
        textarea.input-field {
          resize: vertical;
        }
      `}</style>
    </div>
  );
}
