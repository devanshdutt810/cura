import z from "zod";
import { ZodIssueCode } from "zod/v3";

export const validateLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().nonempty(),
});

export const validateSignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().nonempty(),
    confirmPassword: z.string().nonempty(),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: ZodIssueCode.custom,
        message: "Passwords did not match!",
        path: ["confirmPassword"],
      });
    }
  });
