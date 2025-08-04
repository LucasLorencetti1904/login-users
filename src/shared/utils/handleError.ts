export default function handleError(e: unknown) {
    throw new Error(e instanceof Error ? e.message : String(e));
}