import { z } from "zod";

const addressFormSchema = z.object({
  firstName: z.string({ required_error: "Please enter your first name" }),
  lastName: z.string({ required_error: "Please enter your last name" }),
  email: z
    .string({ required_error: "Please enter your email" })
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "Please enter a password" })
    .email("Please enter a valid email"),
});

export default addressFormSchema;
