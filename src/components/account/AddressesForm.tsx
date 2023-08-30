"use client";

import ButtonSimple from "@/src/components/common/ButtonSimple";
import InputBoxFormik from "@/src/components/common/InputBoxFormik";
import addressFormSchema from "@/src/zod/addressFormSchema";
import { Formik, Form } from "formik";
import { useCallback } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type AddressFormInputs = z.infer<typeof addressFormSchema>;

export default function AddressesForm() {
  const handleSubmit = useCallback(
    (values: AddressFormInputs) => alert(JSON.stringify(values, null, 2)),
    []
  );
  return (
    <Formik
      initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
      validationSchema={toFormikValidationSchema(addressFormSchema)}
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
          <ButtonSimple
            text="Create"
            type="submit"
          />
        </div>
      </Form>
    </Formik>
  );
}
