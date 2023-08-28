"use client";

import ButtonSimple from "@/src/components/common/ButtonSimple";
import InputBoxFormik from "@/src/components/common/InputBoxFormik";
import Link from "next/link";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const loginFormSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email" })
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "Please enter a password" })
    .email("Please enter a valid email"),
});

type LoginFormInputs = z.infer<typeof loginFormSchema>;

const handleSubmit = (values: LoginFormInputs) =>
  alert(JSON.stringify(values, null, 2));

export default function LoginForm() {
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={toFormikValidationSchema(loginFormSchema)}
      onSubmit={handleSubmit}>
      <Form>
        <InputBoxFormik
          name="email"
          type="text"
          label="Email"
        />
        <InputBoxFormik
          name="password"
          type="password"
          label="Password"
        />
        <div className="w-fit text-sm font-semibold border-b border-bgSecondary hover:border-b-2 pt-2">
          <Link href="/account/recover">Forgot your password?</Link>
        </div>
        <div className="w-fit mx-auto pt-8 pb-4">
          <ButtonSimple text="Sign in" />
        </div>
        <div className="w-fit mx-auto text-sm font-semibold border-b border-bgSecondary hover:border-b-2">
          <Link href="/account/register">Create account</Link>
        </div>
      </Form>
    </Formik>
  );
}
