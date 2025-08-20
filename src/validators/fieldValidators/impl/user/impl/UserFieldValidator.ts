import type FieldValidator from "@interfaces/validators/FieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

export default abstract class UserFieldValidator implements FieldValidator {
    protected constructor(public fieldName: string) {}

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