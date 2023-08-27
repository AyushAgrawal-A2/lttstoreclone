import LoginForm from "./LoginForm";

export default function Page() {
  return (
    <main className="m-8 flex flex-col items-center">
      <h2 className="my-8 font-semibold text-3xl md:text-[40px] text-fgQuaternary">
        Login
      </h2>
      <LoginForm />
    </main>
  );
}
