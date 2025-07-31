export default interface PasswordHasher {
    hash(password: string): Promise<string>;
    compare(expectedPassword: string, hashedPassword: string): Promise<boolean>;
}