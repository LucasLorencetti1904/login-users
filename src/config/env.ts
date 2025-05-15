import "dotenv/config";
import envSchema from "./envSchema";

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) process.exit(1);

const env = parsed.data;

export default env;