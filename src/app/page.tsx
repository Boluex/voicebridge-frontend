import Link from 'next/link';
import { Mic, MessageCircle, Package, PhoneForwarded, Check, ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0C1222] text-white overflow-x-hidden">
      {/* Subtle top gradient */}
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#635BFF]/[0.03] via-transparent to-transparent h-[80vh]" />

      {/* Nav */}
      <header className="relative z-20 border-b border-white/[0.06] bg-[#0C1222]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#635BFF] flex items-center justify-center">
              <Mic className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white" style={{ fontFamily: 'Syne, sans-serif' }}>
              VoiceBridge
            </span>
          </Link>
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-sm text-slate-400 hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-sm text-slate-400 hover:text-white transition-colors hidden sm:inline">
              Pricing
            </a>
            <Link href="/auth/clerk-sign-in" className="text-sm text-slate-400 hover:text-white transition-colors">
              Sign in
            </Link>
            <Link
              href="/auth/clerk-sign-up"
              className="text-sm font-medium text-white bg-[#635BFF] hover:bg-[#5851E6] px-4 py-2 rounded-lg transition-colors"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-24">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 text-xs font-medium text-emerald-400/90 mb-8 tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            AI voice receptionist · Live in production
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.15] tracking-tight mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Never miss a call again.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-xl">
            VoiceBridge answers every call with a natural voice, understands your menu, takes orders, and escalates to your team when needed—on your existing phone number.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/auth/clerk-sign-up"
              className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#635BFF] hover:bg-[#5851E6] px-6 py-3 rounded-lg transition-colors"
            >
              Launch your assistant
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-sm text-slate-500">Free to start · No credit card</span>
          </div>
          <div className="mt-12 flex items-center gap-6 text-sm text-slate-500">
            <span>Call logging</span>
            <span className="text-slate-600">·</span>
            <span>Paystack payments</span>
            <span className="text-slate-600">·</span>
            <span>Multilingual</span>
          </div>
        </div>

        {/* Live call preview card */}
        <div className="mt-16 lg:mt-20 lg:max-w-lg lg:absolute lg:right-6 lg:top-32">
          <div className="rounded-2xl border border-white/[0.08] bg-[#151D2E] p-6 shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">Live call</p>
                  <p className="text-sm font-medium text-white">New customer · Lagos</p>
                </div>
              </div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-[#635BFF] bg-[#635BFF]/15 px-2.5 py-1 rounded-md">
                AI receptionist
              </span>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-700/80 flex items-center justify-center flex-shrink-0 text-[10px] font-medium text-slate-400">
                  You
                </div>
                <div className="rounded-xl bg-slate-800/80 px-4 py-3 border border-white/[0.04]">
                  <p className="text-sm text-slate-200">
                    Hi, I run &quot;Lagos Grill&quot;. Can you take phone orders and send payment links?
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#635BFF] flex items-center justify-center flex-shrink-0 text-[10px] font-medium text-white">
                  VB
                </div>
                <div className="rounded-xl bg-[#635BFF]/10 border border-[#635BFF]/20 px-4 py-3">
                  <p className="text-sm text-slate-100">
                    Absolutely. I&apos;ll answer calls, confirm items from your menu, and send secure Paystack links.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500">
              <span>Latency &lt; 500ms</span>
              <span>HD quality</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 border-t border-white/[0.06] bg-[#0E1424] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm font-medium text-[#635BFF] mb-2 tracking-wide">Why VoiceBridge</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Built for real-world service businesses
          </h2>
          <p className="text-slate-400 max-w-2xl mb-14">
            From restaurants to plumbers—understands accents, noisy lines, and incomplete sentences, then turns them into structured, payable orders.
          </p>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: MessageCircle,
                title: 'Understands messy speech',
                desc: 'Interruptions and background noise are normal. Our agent handles them gracefully.',
              },
              {
                icon: Package,
                title: 'Knows your catalogue',
                desc: 'Syncs with your menu or service list so it never sells what you don\'t have.',
              },
              {
                icon: PhoneForwarded,
                title: 'Escalates when it should',
                desc: 'For edge cases and VIPs, the agent routes calls to your team instantly.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.06] bg-[#151D2E]/80 p-6 hover:border-white/[0.1] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#635BFF]/15 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#635BFF]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-24">
        <div className="max-w-4xl mx-auto px-6">
          <p className="text-sm font-medium text-[#635BFF] mb-2 tracking-wide text-center">Pricing</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Simple, usage-based pricing
          </h2>
          <p className="text-slate-400 text-center mb-14">
            Start free. Scale when your assistant pays for itself.
          </p>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                name: 'Launch',
                price: 'Free',
                blurb: 'Test with real callers before you pay.',
                features: ['1 business', 'Up to 100 calls / month', 'Email summaries', 'Basic analytics'],
                highlight: false,
              },
              {
                name: 'Scale',
                price: 'Usage-based',
                blurb: 'For teams replacing full-time reception.',
                features: ['Unlimited businesses', 'Priority latency', 'Advanced analytics', 'Premium support'],
                highlight: true,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-6 ${
                  plan.highlight
                    ? 'bg-[#635BFF]/10 border-[#635BFF]/30'
                    : 'bg-[#151D2E]/80 border-white/[0.06]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-slate-300">{plan.name}</span>
                  {plan.highlight && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#635BFF] bg-[#635BFF]/20 px-2.5 py-1 rounded-md">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>
                  {plan.price}
                </div>
                <p className="text-sm text-slate-400 mb-6">{plan.blurb}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/auth/clerk-sign-up"
                  className={`block text-center py-3 rounded-lg text-sm font-medium transition-colors ${
                    plan.highlight
                      ? 'bg-[#635BFF] hover:bg-[#5851E6] text-white'
                      : 'border border-white/15 text-slate-200 hover:bg-white/5'
                  }`}
                >
                  Get started with {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 border-t border-white/[0.06] bg-[#0E1424] py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
            Turn missed calls into loyal customers
          </h2>
          <p className="text-slate-400 mb-8">
            Go live in under an hour. Your existing number, Neon database. No AI team required.
          </p>
          <Link
            href="/auth/clerk-sign-up"
            className="inline-flex items-center gap-2 text-sm font-medium text-white bg-[#635BFF] hover:bg-[#5851E6] px-6 py-3 rounded-lg transition-colors"
          >
            Create your free account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#635BFF] flex items-center justify-center">
              <Mic className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-400">VoiceBridge</span>
          </div>
          <p className="text-xs text-slate-500">© 2026 VoiceBridge. Built for African SMBs.</p>
        </div>
      </footer>
    </main>
  );
}
