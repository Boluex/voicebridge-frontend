'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="card rounded-xl p-10 text-center max-w-md w-full border border-white/[0.08]">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-emerald-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          Payment successful
        </h1>
        <p className="text-slate-400 text-sm mb-4">Your order has been confirmed and the business has been notified.</p>
        <p className="text-sm text-slate-500 mb-6">You can hang up. Your order is being processed.</p>
        <Link
          href="/"
          className="inline-block text-sm font-medium text-primary-light hover:text-primary transition-colors"
        >
          Back to VoiceBridge
        </Link>
      </div>
    </div>
  );
}
