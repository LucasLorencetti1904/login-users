import type Validator from "../Validator";
import type ErrorMessageGenerator from "../../../helpers/ErrorMessageGenerator";
import type { Maybe } from "../../../types/optionalTypes";

export default abstract class VanillaDataValidator<TDataValidationError extends Error> implements Validator {
    constructor(protected data: Maybe<string | number | Date>) {
        this.trimIfString();
    }

    protected abstract errorMessage: ErrorMessageGenerator;

    protected abstract createError(message: string): TDataValidationError;

    public abstract validate(): void;
    
    protected failsIf(condition: boolean, message: string): void {
        if (condition)
            throw this.createError(message);
    }

    private trimIfString(): void {
        if (this.dataIsString()) {
            (this.data as string).trim()
        }
    }

    private dataIsString(): boolean {
        return typeof this.data == "string";
    }
}