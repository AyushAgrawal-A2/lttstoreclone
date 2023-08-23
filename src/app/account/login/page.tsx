"use client";

import InputBox from "@/src/components/common/InputBox";
import Link from "next/link";
import { useCallback } from "react";

interface CustomElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function Page() {
  const handleSubmit = useCallback((e: React.FormEvent<CustomForm>) => {
    e.preventDefault();
    console.log(e.currentTarget.elements.email.value);
    console.log(e.currentTarget.elements.password.value);
  }, []);

  return (
    <main className="m-8 flex flex-col items-center">
      <h2 className="my-8 font-semibold text-3xl md:text-[40px] text-fgQuaternary">
        Login
      </h2>
      <form onSubmit={handleSubmit}>
        <InputBox
          id="email"
          type="email"
          label="Email"
        />
        <InputBox
          id="password"
          type="password"
          label="Password"
        />
        <div>
          <Link
            href="/account/recover"
            className="text-sm font-semibold border-b border-bgSecondary hover:border-b-2">
            Forgot your password?
          </Link>
        </div>
        <div className="w-fit mx-auto">
          <button type="submit">Sign in</button>
        </div>
      </form>
      <Link
        href="/account/register"
        className="text-sm font-semibold border-b border-bgSecondary hover:border-b-2">
        Create account
      </Link>
    </main>
  );
}
