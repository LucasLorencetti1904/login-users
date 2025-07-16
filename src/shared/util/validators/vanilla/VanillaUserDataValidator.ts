import type { User } from "../../../../models/User";
import type { DataValidationError } from "../../errors/DataValidationError";
import NameValidator from "./NameValidator";
import UserDataValidator from "../UserDataValidator";
import UsernameValidator from "./UsernameValidator";

export default class VanillaUserDataValidator extends UserDataValidator {
    constructor(protected userData: User) {
        super(userData);
    }

    public validate(): void {
        try {
            new UsernameValidator(this.userData.username);
            new NameValidator(this.userData.firstName);
            new NameValidator(this.userData.lastName);
        }

        catch(e: unknown) {
            throw e as DataValidationError;
        }
    }
}