import UserRequestValidator from "@validators/dataValidators/UserRequestValidator";
import type CreateUserRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";

export default class CreateUserRequestValidator extends UserRequestValidator {
    protected verifyEachDataField(data: CreateUserRequestDTO): void {
        this.fieldValidators.forEach((fieldValidator) => {
            const field: string = fieldValidator.fieldName;

            fieldValidator.validate(data[field as keyof CreateUserRequestDTO]);
        });
    }
}