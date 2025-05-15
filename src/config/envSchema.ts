import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().length(4).transform(Number).default(3000),
    DATABASE_URL: z.string().url()
});

export default envSchema.ts;
