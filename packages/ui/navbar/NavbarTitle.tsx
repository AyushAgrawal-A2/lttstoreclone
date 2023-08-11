import Link from 'next/link';

type NavbarTitleProps = {
  href: string;
  name: string;
};

export default function NavbarTitle({ href, name }: NavbarTitleProps) {
  return (
    <Link
      href={href}
      prefetch={true}
      className={
        'tracking-wide p-1.5 underline-offset-[3px] hover:underline hover:animate-grow'
        //  + isActive ? ' underline' : ''
      }>
      {name}
    </Link>
  );
}
