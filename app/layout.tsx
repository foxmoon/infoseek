import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InfoTracker',
  description: 'Multi-platform information aggregation and tracking system',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}