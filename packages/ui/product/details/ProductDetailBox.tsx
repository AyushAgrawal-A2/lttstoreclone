'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ProductDetailBoxProps {
  title: string;
  children: React.ReactNode;
}

export default function ProductDetailBox({
  title,
  children,
}: ProductDetailBoxProps) {
  const [displayDetails, setDisplayDetails] = useState(
    title === 'Description' || title === 'Related Products'
  );
  return (
    <div
      className={`my-2.5 border rounded py-3 px-7 hover:shadow-[inset_0_0_0_3px_rgb(227,227,227)] ${
        displayDetails && 'shadow-[inset_0_0_0_2px_rgb(227,227,227)]'
      } transition duration-300 bg-fgSecondary font-bold relative`}>
      <div
        className="flex justify-between cursor-pointer py-2 bg-fgSecondary sticky top-0 z-10"
        onClick={() => setDisplayDetails((prev) => !prev)}>
        <div className="text-xl">{title}</div>
        <button
          className={`${
            displayDetails && 'rotate-90'
          } hover:scale-[1.15] transition`}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={`${!displayDetails && 'hidden'} overflow-auto z-0`}>
        {children}
      </div>
    </div>
  );
}
