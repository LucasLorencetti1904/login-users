import dotenv from "dotenv";

dotenv.config();

const ENV: Record<string, any> = {
    PORT: Number(process.env.PORT) ?? 3000,
    DATABASE_URL: String(process.env.DATABASE_URL) ?? "database.sqlite",
    PASSWORD_HASHING_SALT: Number(process.env.PASSWORD_HASHING_SALT) ?? 10
};

export default ENV;