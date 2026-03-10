'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../store/auth.store';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading } = useAuthStore();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      toast.error('Password must be at least 8 characters.');
      return;
    }
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Check your email to verify.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err?.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md animate-slide-up">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white font-extrabold" style={{ fontFamily: 'Syne, sans-serif' }}>VB</span>
            </div>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>VoiceBridge</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mt-6 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>Create your account</h1>
          <p className="text-slate-400 text-sm">Get your AI receptionist running today</p>
        </div>

        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Full name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="John Adebayo"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                placeholder="you@business.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                placeholder="Min. 8 characters"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Confirm password</label>
              <input
                type="password"
                required
                value={form.confirmPassword}
                onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="Repeat your password"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/25"
            >
              {isLoading ? 'Creating account...' : 'Create Account — It\'s Free'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-slate-500">
            By signing up, you agree to our Terms of Service.
          </p>

          <div className="mt-4 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
