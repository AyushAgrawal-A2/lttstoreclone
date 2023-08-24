"use client";

interface ButtonSimpleProps {
  text: string;
  onClick?: () => void;
}

export default function ButtonSimple({ text, onClick }: ButtonSimpleProps) {
  return (
    <button
      className="py-3 px-8 bg-bgSecondary text-fgSecondary text-base font-semibold hover:animate-grow"
      onClick={onClick}>
      {text}
    </button>
  );
}
