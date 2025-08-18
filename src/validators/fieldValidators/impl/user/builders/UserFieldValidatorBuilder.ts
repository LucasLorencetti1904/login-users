import type { UserRequestDTO } from "@DTOs/UserDTO/UserInputDTO";
import type Builder from "@interfaces/builders/Builder";
import type FieldValidator from "@interfaces/validators/FieldValidator";

export default abstract class UserFieldValidatorBuilder implements Builder {
    protected fieldName!: string; 

    public defineFieldName(fieldName: keyof UserRequestDTO): this {
        this.fieldName = fieldName;
        return this;
    }

    public abstract build(): FieldValidator;

    protected isMissingFieldName(): boolean {
        return !this.fieldName;
    }
}