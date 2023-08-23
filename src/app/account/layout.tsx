import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "...",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
