"use client";

import ButtonSimple from "@/src/components/common/ButtonSimple";
import InputBoxFormik from "@/src/components/common/InputBoxFormik";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useCallback } from "react";

const registerFormSchema = z.object({
  firstName: z.string({ required_error: "Please enter your first name" }),
  lastName: z.string({ required_error: "Please enter your last name" }),
  email: z
    .string({ required_error: "Please enter your email" })
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "Please enter a password" })
    .email("Please enter a valid email"),
});

type RegisterFormInputs = z.infer<typeof registerFormSchema>;

const handleSubmit = (values: RegisterFormInputs) =>
  alert(JSON.stringify(values, null, 2));

export default function RegisterForm() {
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      validationSchema={toFormikValidationSchema(registerFormSchema)}
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
          type="text"
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
  );
}
