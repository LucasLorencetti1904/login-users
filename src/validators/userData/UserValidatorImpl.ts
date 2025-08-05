import UserValidator from "@interfaces/validators/UserValidator";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UsernameValidator from "@validators/userData/username/UsernameValidator";
import NameValidator from "@validators/userData/name/NameValidator";
import BirthDateValidator from "@validators/userData/birthDate/BirthDateValidator";
import EmailValidator from "@validators/userData/email/EmailValidator";
import PasswordValidator from "@validators/userData/password/PasswordValidator";
import handleError from "@shared/utils/handleError";

export default class UserValidatorImpl implements UserValidator {
    public validate(data: UserRequestDTO): void {
        try {
            new UsernameValidator(data.username);
            new NameValidator(data.firstName);
            new NameValidator(data.lastName);
            new BirthDateValidator(data.birthDate);
            new EmailValidator(data.email);
            new PasswordValidator(data.password);
        }

        catch(e: unknown) {
            handleError(e);
        }
    }
}