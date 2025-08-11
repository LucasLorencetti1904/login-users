import type UserValidator from "@interfaces/validators/UserValidator";
import UserFieldValidator from "@validators/userData/fieldValidators/UserFieldValidator";
import type UserUpdateRequestDTO from "@DTOs/UserDTO/UserUpdateRequestDTO";
import handleError from "@shared/utils/handleError";

type ValidatorClass = new (...args: any) => UserFieldValidator;
type FieldsAndValidators = [any, ValidatorClass][];

export default class UpdateUserDataValidator implements UserValidator {
    constructor(private validations: (data: UserUpdateRequestDTO) => FieldsAndValidators) {}

    public validate(data: UserUpdateRequestDTO): void {
        const fieldsAndValidators: FieldsAndValidators = this.validations(data);

        try {
            this.verifyEach(fieldsAndValidators);
        }

        catch(e: unknown) {
            handleError(e);
        }
    }

    private verifyEach(f: FieldsAndValidators): void {
        f.forEach(([field, Validator]) => {
            this.verifyIfDefined(field, Validator);
        });
    };

    private verifyIfDefined(field: any, Validator: ValidatorClass): void {
        if (field != null && field != undefined) {
            new Validator(field);
        }
    }
}