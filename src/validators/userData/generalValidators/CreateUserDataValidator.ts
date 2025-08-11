import type UserValidator from "@interfaces/validators/UserValidator";
import UserFieldValidator from "@validators/userData/fieldValidators/UserFieldValidator";
import UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";
import handleError from "@shared/utils/handleError";

type ValidatorClass = new (...args: any) => UserFieldValidator;
type FieldsAndValidators = [any, ValidatorClass][];

export default class CreateUserDataValidator implements UserValidator {
    constructor(private validations: (data: UserCreateRequestDTO) => FieldsAndValidators) {}

    public validate(data: UserCreateRequestDTO): void {
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
            new Validator(field);
        });
    };
}