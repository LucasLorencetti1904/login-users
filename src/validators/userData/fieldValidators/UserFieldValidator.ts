import type ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import FieldValidator from "@interfaces/validators/FieldValidator";

export default abstract class UserFieldValidator implements FieldValidator {
    protected abstract errorMessage: ErrorMessageGenerator;

    protected handleStringField(field: string): string {
        return field.trim();
    }

    public abstract validate(field: unknown): void;
    
    protected failsIf(condition: boolean, message: string): void {
        if (condition)
            throw new Error(message);
    }
}