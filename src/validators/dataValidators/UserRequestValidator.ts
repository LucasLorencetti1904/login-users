import type Validator from "@interfaces/validators/Validator";
import UserFieldValidator from "@validators/fieldValidators/impl/user/impl/UserFieldValidator";
import handleError from "@shared/utils/handleError";

export default abstract class UserRequestValidator implements Validator {
    constructor(protected fieldValidators: UserFieldValidator[]) {}

    public validate(data: unknown): void {
        try {
            this.verifyEachDataField(data);
        }

        catch(e: unknown) {
            handleError(e);
        }
    }

    protected abstract verifyEachDataField(data: unknown): void;
}