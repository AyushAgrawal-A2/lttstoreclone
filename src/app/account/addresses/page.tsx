"use client";

import ButtonSimple from "@/src/components/common/ButtonSimple";
import InputBox from "@/src/components/common/InputBox";
import { useCallback } from "react";

interface CustomElements extends HTMLFormControlsCollection {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function Page() {
  const handleSubmit = useCallback((e: React.FormEvent<CustomForm>) => {
    e.preventDefault();
    console.log(e.currentTarget.elements.firstName.value);
    console.log(e.currentTarget.elements.lastName.value);
    console.log(e.currentTarget.elements.email.value);
    console.log(e.currentTarget.elements.password.value);
  }, []);

  return (
    <main className="m-8 flex flex-col items-center">
      <h2 className="my-8 font-semibold text-3xl md:text-[40px] text-fgQuaternary">
        Create account
      </h2>
      <form onSubmit={handleSubmit}>
        <InputBox
          name="firstName"
          type="text"
          label="First name"
        />
        <InputBox
          name="lastName"
          type="text"
          label="Last name"
        />
        <InputBox
          name="email"
          type="email"
          label="Email"
        />
        <InputBox
          name="password"
          type="password"
          label="Password"
        />
        <div className="w-fit mx-auto py-8">
          <ButtonSimple text="Create" />
        </div>
      </form>
    </main>
  );
}
