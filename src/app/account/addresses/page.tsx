import { Metadata } from "next";
import AddressesForm from "./AddressesForm";

export const metadata: Metadata = {
  title: "Addresses",
  description:
    "This website a clone of lttstore.com, developed as a hobby project to learn fullstack development",
};

export default async function Page() {
  return (
    <main className="m-8 flex flex-col items-center">
      <h2 className="my-8 font-semibold text-3xl md:text-[40px] text-fgQuaternary">
        Addresses
      </h2>
      <AddressesForm />
    </main>
  );
}
