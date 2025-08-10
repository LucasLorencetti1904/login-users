import type UserValidator from "@interfaces/validators/UserValidator";
import UserDataValidator from "@validators/userData/fieldValidators/UserDataValidator";
import UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";
import UsernameValidator from "@validators/userData/fieldValidators/username/UsernameValidator";
import NameValidator from "@validators/userData/fieldValidators/name/NameValidator";
import BirthDateValidator from "@validators/userData/fieldValidators/birthDate/BirthDateValidator";
import EmailValidator from "@validators/userData/fieldValidators/email/EmailValidator";
import PasswordValidator from "@validators/userData/fieldValidators/password/PasswordValidator";
import handleError from "@shared/utils/handleError";

type SetOfFields = [any, new (...args: any) => UserDataValidator][];

export default class CreateUserDataValidator implements UserValidator {
    public validate(data: UserCreateRequestDTO): void {
        const fields: SetOfFields = this.generateValidationSetWithFields(data);

        try {
            this.verifyEach(fields);
        }

        catch(e: unknown) {
            handleError(e);
        }
    }

    private generateValidationSetWithFields(data: UserCreateRequestDTO): SetOfFields {
        return [
            [data.username, UsernameValidator],
            [data.firstName, NameValidator],
            [data.lastName, NameValidator],
            [data.birthDate, BirthDateValidator],
            [data.email, EmailValidator],
            [data.password, PasswordValidator]
        ];
    }

    private verifyEach(fields: SetOfFields): void {
        fields.forEach(([field, ValidationClass]) => {
            new ValidationClass(field);
        });
    };
}