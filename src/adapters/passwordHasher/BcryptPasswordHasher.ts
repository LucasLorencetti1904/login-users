import PasswordHasher from "@interfaces/adapters/PasswordHasher";
import bcrypt from "bcryptjs";

export default class BcryptPasswordHasher implements PasswordHasher {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 10);
    }

    async compare(expectedPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(expectedPassword, hashedPassword);
    }
}