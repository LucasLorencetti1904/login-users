import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().length(4).default("3000").transform(Number),
    DATABASE_URL: z.string().url()
});

export default envSchema;