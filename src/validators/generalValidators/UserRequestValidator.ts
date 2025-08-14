import type Validator from "@interfaces/validators/Validator";
import type FieldValidator from "@interfaces/validators/FieldValidator";
import type UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";
import handleError from "@shared/utils/handleError";

export default class UserRequestValidator implements Validator {
    constructor(private fieldValidators: FieldValidator[]) {}

    public validate(data: UserCreateRequestDTO): void {
        try {
            this.verifyEachDataField(data);
        }

        catch(e: unknown) {
            handleError(e);
        }
    }

    private verifyEachDataField(data: UserCreateRequestDTO): void {
        this.fieldValidators.forEach((validator) => {
            validator.validate(data);
        });
    };
}