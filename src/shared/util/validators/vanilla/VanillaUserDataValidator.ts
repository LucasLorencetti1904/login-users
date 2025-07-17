import type Validator from "../Validator";
import type ErrorMessageGenerator from "../../../helpers/ErrorMessageGenerator";

export default abstract class VanillaDataValidator<TDataValidationError extends Error> implements Validator {
    protected data: string;

    constructor(data: string) {
        this.data = data.trim();
    }

    protected abstract errorMessage: ErrorMessageGenerator;

    protected abstract createError(message: string): TDataValidationError;

    public abstract validate(): void;
    
    protected failsIf(condition: boolean, message: string): void {
        if (condition)
            throw this.createError(message);
    }
}