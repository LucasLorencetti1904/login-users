import { z } from "zod";

const accentuationRegex = /^[^\u00C0-\u017F]+$/;
const spaceRegex = /^\S*$/;

const UsernameSchema = z
    .string()
    .min(4, { message: "Username must contain at least 4 characters." })
    .max(10, { message: "Username must contain a maximum of 10 characters." })
    .regex(accentuationRegex, { message: "Username cannot contain accents." })
    .regex(spaceRegex, { message: "Username cannot contain spaces." })
;

const EmailSchema = z
    .string()
    .email({ message: "Email must be valid." })
;

const PasswordSchema = z
    .string()
    .min(4, { message: "Password must contain at least 4 characters." })
    .max(12, { message: "Password must contain a maximum of 12 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least 1 uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least 1 lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least 1 number." })
    .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least 1 special character." })
    .regex(accentuationRegex, { message: "Password cannot contain accents." })
    .regex(spaceRegex, { message: "Password cannot contain spaces." })
;

export const UserSchema = z.object({
    username: UsernameSchema,
    email: EmailSchema,
    password: PasswordSchema
}).passthrough();

export type User = z.infer<typeof UserSchema>;

export default UserSchema;