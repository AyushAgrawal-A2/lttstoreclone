import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

type NavbarIconProps = {
  href: string;
  faIcon?: IconDefinition;
  children?: React.ReactNode;
};

export default function NavbarIcon({
  href,
  faIcon,
  children,
}: NavbarIconProps) {
  return (
    <Link href={href}>
      {faIcon && (
        <FontAwesomeIcon
          icon={faIcon}
          size={'lg'}
          className="hover:scale-[1.15]"
        />
      )}
      {children}
    </Link>
  );
}
