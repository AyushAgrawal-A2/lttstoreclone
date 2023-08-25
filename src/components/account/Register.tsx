"use client";

import ButtonSimple from "@/src/components/common/ButtonSimple";
import InputBoxFormik from "../common/InputBoxFormik";
import { Formik, Form, Field } from "formik";
import { z } from "zod";
import { useCallback } from "react";

const registerFormSchema = z.object({
  firstName: z.string({ required_error: "Please enter your first name" }),
  lastName: z.string({ required_error: "Please enter your last name" }),
  email: z.string().email("Please enter a valid email"),
  password: z.string().email("Please enter a valid email"),
});

type RegisterFormInputs = z.infer<typeof registerFormSchema>;

export default function Register() {
  const handleSubmit = useCallback(
    (values: RegisterFormInputs) => alert(JSON.stringify(values, null, 2)),
    []
  );

  return (
    <main className="m-8 flex flex-col items-center">
      <h2 className="my-8 font-semibold text-3xl md:text-[40px] text-fgQuaternary">
        Create account
      </h2>
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        onSubmit={handleSubmit}>
        <Form>
          <InputBoxFormik
            name="firstName"
            type="text"
            label="First name"
          />
          <InputBoxFormik
            name="lastName"
            type="text"
            label="Last name"
          />
          <InputBoxFormik
            name="email"
            type="email"
            label="Email"
          />
          <InputBoxFormik
            name="password"
            type="password"
            label="Password"
          />
          <div className="w-fit mx-auto py-8">
            <ButtonSimple text="Create" />
          </div>
        </Form>
      </Formik>
    </main>
  );
}
