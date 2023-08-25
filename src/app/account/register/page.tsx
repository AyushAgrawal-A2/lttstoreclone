import Register from "@/src/components/account/Register";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "This website a clone of lttstore.com, developed as a hobby project to learn fullstack development",
};

export default async function Page() {
  return <Register />;
}
