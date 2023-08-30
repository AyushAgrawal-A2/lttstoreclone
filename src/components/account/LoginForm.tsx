"use client";

import ButtonSimple from "@/src/components/common/ButtonSimple";
import InputBoxFormik from "@/src/components/common/InputBoxFormik";
import loginFormSchema from "@/src/zod/loginFormSchema";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type LoginFormInputs = z.infer<typeof loginFormSchema>;

export default function LoginForm() {
  const router = useRouter();
  const [errorStatus, setErrorStatus] = useState<number>();
  const handleSubmit = useCallback(
    async (formData: LoginFormInputs) => {
      try {
        setErrorStatus(undefined);
        await axios.post("/api/auth/login", formData);
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
            {errorStatus === 401 ? (
              <span>Incorrect email or password.</span>
            ) : (
              <span>Internal server error occurred.</span>
            )}
          </div>
        </div>
      )}
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
          <div className="w-fit text-sm text-fgTertiary font-semibold border-b border-fgTertiary hover:text-fgQuaternary hover:shadow-[inset_0_-3px_0_-2px_var(--foreground-quaternary-rgb)] pt-2">
            <Link href="/account/reset">Forgot your password?</Link>
          </div>
          <div className="w-fit mx-auto pt-8 pb-4">
            <ButtonSimple
              text="Sign in"
              type="submit"
            />
          </div>
          <div className="mx-auto w-fit text-sm text-fgTertiary font-semibold border-b border-fgTertiary hover:text-fgQuaternary hover:shadow-[inset_0_-3px_0_-2px_var(--foreground-quaternary-rgb)]">
            <Link href="/account/register">Create account</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
