import "./globals.css";
import { Poppins } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import Header from "@/src/components/common/Header";
import Navbar from "@/src/components/navbar/Navbar";
import Footer from "@/src/components/common/Footer";
import { Metadata } from "next";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });
config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    template: "%s - Linus Tech Tips Store Clone",
    default: "Linus Tech Tips Store Clone",
  },
  description:
    "This website a clone of lttstore.com, developed as a hobby project to learn fullstack development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={"min-h-screen w-full flex flex-col " + poppins.className}>
        <Header />
        <Navbar />
        <div className="grow w-full max-w-[1800px] mx-auto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
