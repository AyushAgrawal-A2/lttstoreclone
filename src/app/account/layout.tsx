import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s - Linus Tech Tips Store Clone",
    default: "Account - Linus Tech Tips Store Clone",
  },
  description:
    "This website a clone of lttstore.com, developed as a hobby project to learn fullstack development",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
