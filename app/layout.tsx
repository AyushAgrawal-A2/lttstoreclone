import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Header from '@/packages/ui/common/Header';
import Navbar from '@/packages/ui/navbar/Navbar';
import Footer from '@/packages/ui/common/Footer';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Linus Tech Tips Store',
  // description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={'min-h-screen w-full flex flex-col'}>
        <Header />
        <Navbar />
        <div className="grow w-full max-w-[1800px] mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}