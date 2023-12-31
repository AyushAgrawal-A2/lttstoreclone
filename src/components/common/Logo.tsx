import Image from "next/image";

interface LogoProps {
  size: number;
}

export default function Logo({ size }: LogoProps) {
  return (
    <div className="w-full h-full py-[7.5px] hover:animate-grow relative">
      <Image
        src="/assets/images/LTT_Logo.png"
        alt="LTT Logo"
        width={size}
        height={size}
      />
      <div className="rotate-[-15deg] text-LTTOrange font-bold absolute top-[35%] left-[93%]">
        clone
      </div>
    </div>
  );
}
