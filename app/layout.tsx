import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AmbientBackground } from '@/components/common/AmbientBackground';

export const metadata: Metadata = {
  title: 'prdmaker by wigan7 — AI Product Architect & Markdown Spec Generator',
  description:
    'prdmaker by wigan7: Turn your application idea into production-ready specifications with an adaptive AI architect. Generates PRD, Design, Architecture, Database, and Agent documents.',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8F9FB' },
    { media: '(prefers-color-scheme: dark)', color: '#0B0C10' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen selection:bg-blue-500/20 selection:text-blue-600 flex flex-col">
        <AmbientBackground />
        <div className="relative z-10 flex flex-col flex-1 min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}