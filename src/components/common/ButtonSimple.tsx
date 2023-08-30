"use client";

interface ButtonSimpleProps {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function ButtonSimple({
  text,
  onClick,
  type = "button",
  disabled = false,
}: ButtonSimpleProps) {
  return (
    <button
      className="py-3 px-8 bg-bgSecondary text-fgSecondary text-base font-semibold hover:enabled:animate-grow disabled:opacity-30"
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {text}
    </button>
  );
}
