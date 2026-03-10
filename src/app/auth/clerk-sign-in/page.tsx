'use client';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';

export default function ClerkSignInPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-purple/10 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>VB</span>
            </div>
            <span className="text-xl font-semibold text-white" style={{ fontFamily: 'Syne, sans-serif' }}>VoiceBridge</span>
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Sign in to your{' '}
            <span className="gradient-text">AI receptionist</span> control room.
          </h1>
          <p className="text-slate-400 text-sm max-w-md">
            Access call logs, manage your catalogue, and configure your voice agent in one place.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="card rounded-xl p-6 w-full max-w-md border border-white/[0.08]">
            <SignIn
              appearance={{
                elements: {
                  card: 'bg-transparent shadow-none',
                  headerTitle: 'text-white',
                  headerSubtitle: 'text-slate-400',
                  socialButtonsBlockButton: 'bg-white/[0.06] border border-white/10 text-slate-200 hover:bg-white/10 rounded-lg',
                  formFieldInput: 'bg-white/[0.06] border border-white/10 text-white placeholder:text-slate-500 focus:border-[#635BFF] focus:ring-2 focus:ring-primary/20 rounded-lg',
                  formButtonPrimary: 'bg-primary hover:bg-primary-hover text-white font-medium rounded-lg',
                  footerActionLink: 'text-primary-light hover:text-primary',
                },
              }}
              routing="hash"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
