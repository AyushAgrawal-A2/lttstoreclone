import { Metadata } from "next";
import RegisterForm from "@/src/components/account/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "This website a clone of lttstore.com, developed as a hobby project to learn fullstack development",
};

export default async function Page() {
  return (
    <main className="m-8 flex flex-col items-center">
      <h2 className="my-8 font-semibold text-3xl md:text-[40px] text-fgQuaternary">
        Create account
      </h2>
      <RegisterForm />
    </main>
  );
}
