import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="m-14 flex flex-col md:flex-row last:gap-14">
      <div className="basis-1/2 text-3xl lg:text-5xl font-bold bg-gradient bg-clip-text text-transparent tracking-wide text-center md:text-left">
        SUBSCRIBE TO OUR NEWSLETTER
      </div>
      <div className="basis-1/2 flex flex-col items-center md:flex-row md:items-start flex-wrap gap-5 md:gap-0 text-fgTertiary">
        <div className="w-1/2">
          <div className="text-lg font-bold mb-4 text-center md:text-left">
            INFO
          </div>
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/blogs/the-newsletter-archive"
              className="text-sm font-semibold my-1 hover:underline"
            >
              Newsletter
            </Link>
            <Link
              href="/blogs/the-newsletter-archive"
              className="text-sm font-semibold my-1 hover:underline"
            >
              Shipping Policy
            </Link>
            <Link
              href="/blogs/the-newsletter-archive"
              className="text-sm font-semibold my-1 hover:underline"
            >
              Customs & Duty Fees
            </Link>
            <Link
              href="/blogs/the-newsletter-archive"
              className="text-sm font-semibold my-1 hover:underline"
            >
              Return Policy
            </Link>
            <Link
              href="/blogs/the-newsletter-archive"
              className="text-sm font-semibold my-1 hover:underline"
            >
              Terms and Conditions
            </Link>
            <Link
              href="/blogs/the-newsletter-archive"
              className="text-sm font-semibold my-1 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="w-1/2">
          <div className="text-lg font-bold mb-4 text-center md:text-left">
            SUPPORT
          </div>
          <div className="flex flex-col items-center md:items-start">
            <Link
              href="/blogs/the-newsletter-archive"
              className="text-sm font-semibold my-1 hover:underline"
            >
              FAQ
            </Link>
            <Link
              href="/blogs/the-newsletter-archive"
              className="text-sm font-semibold my-1 hover:underline"
            >
              Contact Us
            </Link>
            <Link href="/">
              <Logo size={65} />
            </Link>
          </div>
        </div>
        <div className="w-full my-4 text-lg font sans font-bold text-fgPrimary text-center md:text-left">
          LTTStore clone, Developed by Ayush
        </div>
      </div>
    </div>
  );
}
