import bcrypt from "bcryptjs";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import ENV from "@config/env";

export default class BcryptPasswordHasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, ENV.PASSWORD_HASHING_SALT);
    }

    async compare(expectedPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(expectedPassword, hashedPassword);
    }
}