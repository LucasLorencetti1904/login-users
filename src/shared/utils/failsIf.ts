type ErrorClass = new (...args: any) => Error;

export default function failsIf (
    assertation: boolean | boolean[], errorMessage: string, ErrorType?: ErrorClass
): void {
    assertation = Array.isArray(assertation) ? assertation.some(Boolean) : assertation;

    if (assertation) {
        throw new (ErrorType || Error)(errorMessage);
    } 
}