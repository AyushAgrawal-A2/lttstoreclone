import { z } from "zod";

const resetFormSchema = z.object({
  email: z
    .string({ required_error: "Please enter your email" })
    .email("Please enter a valid email.")
    .max(50, "Email is too long."),
});

export default resetFormSchema;
