import { describe, beforeEach, vi, it, expect } from "vitest";
import BcryptPasswordHasher from "@adapters/passwordHasher/BcryptPasswordHasher";

let hasher: BcryptPasswordHasher;
let password: string;
let hashedPassword: string;
let passwordsMatch: boolean;

describe ("Password Hashing test", () => {
    beforeEach (() => {
        vi.clearAllMocks();
        hasher = new BcryptPasswordHasher();
    });
    
    it ("returns a hashed password when 'hash()' method is called.", async () => {
        password = "PasswordExample12345!*";
        hashedPassword = await hasher.hash(password);

        expect (hashedPassword).toBeTypeOf(typeof password);
        expect (hashedPassword).not.toEqual(password);
    });

    it ("returns 'true' when 'compare()' method is called with passwords that match.", async () => {
        password = "PasswordExample12345!*";
        hashedPassword = await hasher.hash(password);

        passwordsMatch = await hasher.compare(password, hashedPassword); 

        expect (passwordsMatch).toEqual(true);
    });

    it ("returns 'false' when 'compare()' method is called with passwords that don´t match.", async () => {
        password = "PasswordExample12345!*";
        hashedPassword = await hasher.hash(password);

        passwordsMatch = await hasher.compare("WrongPasswordExample123!*", hashedPassword)

        expect (passwordsMatch).toEqual(false);
    });
});