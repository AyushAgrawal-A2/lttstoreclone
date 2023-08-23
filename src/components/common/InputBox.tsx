interface InputBoxProps {
  id: string;
  type: string;
  label: string;
}

export default function InputBox({ id, type, label }: InputBoxProps) {
  return (
    <div className="w-[300px] md:w-[450px] focus-within:shadow-[inset_0_0_0_2px_var(--foreground-quaternary-rgb)]">
      <div className="relative my-4 p-6 pb-2 font-semibold border-b border-bgSecondary hover:shadow-[inset_0_-6px_0_-2px_var(--foreground-quaternary-rgb)] focus-within:shadow-[inset_0_0_0_2px_var(--foreground-quaternary-rgb)]">
        <input
          id={id}
          type={type}
          placeholder=" "
          className="peer bg-transparent autofill:shadow-[inset_0_0_0px_1000px_var(--background-primary-rgb)]
 outline-0 w-full"
        />
        <label
          htmlFor={id}
          className="absolute left-6 top-1 text-xs font-semibold peer-focus:text-xs peer-focus:top-1 peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg">
          {label}
        </label>
      </div>
    </div>
  );
}
