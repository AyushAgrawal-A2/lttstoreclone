"use client";

import ButtonSimple from "@/src/components/common/ButtonSimple";
import InputBoxFormik from "@/src/components/common/InputBoxFormik";
import registerFormSchema from "@/src/zod/registerFormSchema";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type RegisterFormInputs = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [errorStatus, setErrorStatus] = useState<number>();
  const handleSubmit = useCallback(
    async (formData: RegisterFormInputs) => {
      try {
        setErrorStatus(undefined);
        await axios.post("/api/auth/register", formData);
        router.replace("/");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response)
          setErrorStatus(error.response.status);
        else setErrorStatus(500);
      }
    },
    [router]
  );
  return (
    <div className="w-[300px] md:w-[450px]">
      {!!errorStatus && (
        <div className="py-2">
          <div className="text-justify font-semibold">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-600"
            />
            <span>&nbsp;</span>
            {errorStatus === 400 && (
              <span>Invalid form data, please correct field errors.</span>
            )}
            {errorStatus === 409 && (
              <span>
                This email address is already associated with an account. If
                this account is yours, you can{" "}
                <Link
                  href={"/account/reset"}
                  className="underline">
                  reset your password
                </Link>
                .
              </span>
            )}
            {errorStatus >= 500 && <span>Internal server error occurred.</span>}
          </div>
        </div>
      )}
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
          <div className="w-fit mx-auto pt-8">
            <ButtonSimple
              text="Create"
              type="submit"
            />
          </div>
        </Form>
      </Formik>
    </div>
  );
}
