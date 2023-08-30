import { z } from "zod";

const registerFormSchema = z.object({
  firstName: z
    .string({ required_error: "Please enter your first name." })
    .max(50, "First name is too long"),
  lastName: z.string().max(50, "Last name is too long.").optional(),
  email: z
    .string({ required_error: "Please enter your email." })
    .email("Please enter a valid email.")
    .max(50, "Email is too long."),
  password: z
    .string({ required_error: "Please enter a password." })
    .regex(/^[^\s]+$/g, "Password must not contain whitespaces.")
    .regex(
      /^[A-Za-z0-9`~!@#$%^&*()\-_=+]+$/g,
      "Password contains invalid character.\nOnly letters, numbers and `~!@#$%^&*()-_=+ characters are allowed."
    )
    .regex(/[A-Z]/, "Password must contain atleast one uppercase letter.")
    .regex(/[a-z]/, "Password must contain atleast one lowercase letter.")
    .regex(/[0-9]/, "Password must contain atleast one number.")
    .regex(
      /[`~!@#$%^&*()\-_=+]/,
      "Password must contain atleast one special character e.g. `~!@#$%^&*()-_=+"
    )
    .min(8, "Password must be 8 - 25 character long.")
    .max(25, "Password must be 8 - 25 character long."),
});

export default registerFormSchema;
