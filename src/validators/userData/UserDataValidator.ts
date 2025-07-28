import type Validator from "@validators/Validator";
import type { Maybe } from "@shared/types/optionalTypes";
import type ErrorMessageGenerator from "@shared/errors/ErrorMessageGenerator";

export default abstract class UserDataValidator implements Validator {
    constructor(protected data: Maybe<string>) {
        this.data?.trim();
    }

    protected abstract errorMessage: ErrorMessageGenerator;

    public abstract validate(): void;
    
    protected failsIf(condition: boolean, message: string): void {
        if (condition)
            throw new Error(message);
    }
}