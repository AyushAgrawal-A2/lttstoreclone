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
      <div
        className={
          meta.touched && !!meta.error
            ? "shadow-[inset_0_0_0_2px_red]"
            : "focus-within:shadow-[inset_0_0_0_2px_var(--foreground-quaternary-rgb)]"
        }>
        <div
          className={
            "relative p-6 pb-2 font-semibold border-b " +
            (meta.touched && !!meta.error
              ? " border-red-600 hover:shadow-[inset_0_-6px_0_-2px_red]"
              : " border-bgSecondary hover:shadow-[inset_0_-6px_0_-2px_var(--foreground-quaternary-rgb)]")
          }>
          <input
            id={props.name}
            {...field}
            {...props}
            placeholder=" "
            className="peer bg-transparent outline-0 w-full"
          />
          <label
            htmlFor={props.name}
            className="absolute font-semibold text-fgTertiary left-6 top-1 text-xs peer-focus:text-xs peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg">
            {label}
          </label>
        </div>
      </div>
      <div className="mt-1 mb-2 text-sm whitespace-pre-line">
        {meta.touched && !!meta.error ? (
          <>
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-red-600"
            />
            <span>&nbsp;</span>
            <span>{meta.error}</span>
          </>
        ) : (
          <span>&nbsp;</span>
        )}
      </div>
    </>
  );
}
