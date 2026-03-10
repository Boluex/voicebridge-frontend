import type { Metadata } from 'next';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { Providers } from '../components/providers';

export const metadata: Metadata = {
  title: 'VoiceBridge — AI Voice Receptionist for Small Businesses',
  description: 'Deploy an intelligent AI voice receptionist for your business. Handle calls, orders, payments and more — 24/7.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0C1222] text-slate-200 antialiased">
        <ClerkProvider>
          <Providers>{children}</Providers>
        </ClerkProvider>
      </body>
    </html>
  );
}
