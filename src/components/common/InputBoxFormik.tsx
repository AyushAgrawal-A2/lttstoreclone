import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useField } from "formik";

interface InputBoxFormikProps {
  name: string;
  type: string;
  label: string;
}

export default function InputBoxFormik({
  label,
  ...props
}: InputBoxFormikProps) {
  const [field, meta] = useField(props);

  return (
    <>
      <div className="w-[300px] md:w-[450px] focus-within:shadow-[inset_0_0_0_2px_var(--foreground-quaternary-rgb)]">
        <div className="relative p-6 pb-2 font-semibold border-b border-bgSecondary hover:shadow-[inset_0_-6px_0_-2px_var(--foreground-quaternary-rgb)] focus-within:shadow-[inset_0_0_0_2px_var(--foreground-quaternary-rgb)]">
          <input
            {...field}
            {...props}
            placeholder=" "
            className="peer bg-transparent outline-0 w-full"
          />
          <label
            htmlFor={props.name}
            className="absolute left-6 top-1 text-xs font-semibold peer-focus:text-xs peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg">
            {label}
          </label>
        </div>
      </div>
      <div className="mt-1 text-sm">
        {meta.touched && !!meta.error ? (
          <>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-600"
            />
            <span>{" " + meta.error}</span>
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </>
  );
}
