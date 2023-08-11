import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Link from 'next/link';

type NavbarIconProps = {
  href: string;
  faIcon: IconDefinition;
};

export default function NavbarIcon({ href, faIcon }: NavbarIconProps) {
  return (
    <Link
      href={href}
      prefetch={true}>
      <FontAwesomeIcon
        icon={faIcon}
        size={'lg'}
        className="hover:scale-[1.15]"
      />
    </Link>
  );
}
