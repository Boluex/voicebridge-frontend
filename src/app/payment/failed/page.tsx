'use client';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="card rounded-xl p-10 text-center max-w-md w-full border border-white/[0.08]">
        <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <XCircle size={36} className="text-red-400" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
          Payment failed
        </h1>
        <p className="text-slate-400 text-sm mb-6">Your payment could not be processed. Please try again or contact the business directly.</p>
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
