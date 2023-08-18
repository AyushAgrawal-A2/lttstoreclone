import './globals.css';
import { Poppins } from 'next/font/google';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Header from '@/packages/ui/common/Header';
import Navbar from '@/packages/ui/navbar/Navbar';
import Footer from '@/packages/ui/common/Footer';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });
config.autoAddCss = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          'min-h-screen w-full flex flex-col overflow-y-scroll ' +
          poppins.className
        }>
        <Header />
        <Navbar />
        <div className="grow w-full max-w-[1800px] mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
