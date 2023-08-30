"use client";

import ButtonSimple from "@/src/components/common/ButtonSimple";
import InputBoxFormik from "@/src/components/common/InputBoxFormik";
import resetFormSchema from "@/src/zod/resetFormSchema";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { Formik, Form } from "formik";
import Link from "next/link";
import { useCallback, useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

type ResetFormInputs = z.infer<typeof resetFormSchema>;

export default function ResetForm() {
  const [status, setStatus] = useState<number>();
  const handleSubmit = useCallback(async (formData: ResetFormInputs) => {
    try {
      setStatus(undefined);
      await axios.post("/api/auth/reset", formData);
      setStatus(200);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response)
        setStatus(error.response.status);
      else setStatus(500);
    }
  }, []);
  return (
    <div className="w-[300px] md:w-[450px]">
      {!status ? (
        <div className="font-semibold text-fgTertiary mb-4 text-center">
          We will send you an email to reset your password
        </div>
      ) : status < 300 ? (
        <div className="font-semibold text-justify mb-4">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="text-green-600	"
          />
          <span>&nbsp;</span>
          <span>
            We&apos;ve sent you an email with a link to update your password.
          </span>
        </div>
      ) : (
        <div className="font-semibold text-justify mb-4">
          <FontAwesomeIcon
            icon={faCircleExclamation}
            className="text-red-600"
          />
          <span>&nbsp;</span>
          {status === 404 && <span>No account found with that email.</span>}
          {status >= 500 && <span>Internal server error occurred.</span>}
        </div>
      )}
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={toFormikValidationSchema(resetFormSchema)}
        onSubmit={handleSubmit}>
        <Form>
          <InputBoxFormik
            name="email"
            type="text"
            label="Email"
          />
          <div className="w-fit mx-auto my-4">
            <ButtonSimple
              text="Submit"
              type="submit"
              disabled={status === 200}
            />
          </div>
          <div className="w-fit mx-auto text-sm text-fgTertiary font-semibold border-b border-fgTertiary hover:text-fgQuaternary hover:shadow-[inset_0_-3px_0_-2px_var(--foreground-quaternary-rgb)]">
            <Link href="/account/login">Cancel</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
