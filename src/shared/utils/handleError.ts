type ErrorClass = new (message?: string) => Error;

export default function handleError(e: unknown, ErrorType?: ErrorClass): never {
    ErrorType = ErrorType ?? Error;

    throw new ErrorType(e instanceof Error ? e.message : String(e));
}