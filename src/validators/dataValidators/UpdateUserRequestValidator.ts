import UserRequestValidator from "@validators/dataValidators/UserRequestValidator";
import type { UpdateUserRequestDTO } from "@DTOs/UserDTO/UpdateUserDTO";
import { Maybe } from "@shared/types/optionalTypes";

export default class UpdateUserRequestValidator extends UserRequestValidator {
    protected verifyEachDataField(data: UpdateUserRequestDTO): void {
        this.fieldValidators.forEach((fieldValidator) => {
            const field: Maybe<string> = data[fieldValidator.fieldName as keyof UpdateUserRequestDTO];

            field && fieldValidator.validate(field);
        });
    }
}