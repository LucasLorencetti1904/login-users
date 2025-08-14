import type Builder from "@interfaces/builders/Builder";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import type FieldValidator from "@interfaces/validators/FieldValidator";

export default abstract class FieldValidatorBuilder implements Builder {
    protected fieldName!: string;

    public addFieldName(fieldName: keyof UserRequestDTO): this {
        this.fieldName = fieldName;
        return this;
    }

    public abstract build(): FieldValidator;

    protected isMissingFieldName(): boolean {
        return !this.fieldName;
    }
}