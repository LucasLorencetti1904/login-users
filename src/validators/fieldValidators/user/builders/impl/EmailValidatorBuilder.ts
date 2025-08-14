import FieldValidatorBuilder from "../abstract/FieldValidatorBuilder";
import type EmailPartHandler from "@interfaces/validators/EmailPartHandler";
import EmailValidator from "@validators/fieldValidators/user/impl/email/base/EmailValidator";

export default class EmailValidatorBuilder extends FieldValidatorBuilder {
    private userHandler!: EmailPartHandler;
    private domainHandler!: EmailPartHandler;

    public withUserPartHandler(userHandler: EmailPartHandler): this {
        this.userHandler = userHandler;
        return this;
    }

    public withDomainPartHandler(domainHandler: EmailPartHandler): this {
        this.domainHandler = domainHandler;
        return this;
    }

    public build(): EmailValidator {
        if (this.isMissingFieldName() || this.isMissingDependencies()) {
            throw new Error("Email Validator is missing dependencies.");
        }

        return new EmailValidator(this.fieldName, this.userHandler, this.domainHandler);
    }

    private isMissingDependencies(): boolean {
        return !this.userHandler || !this.domainHandler;
    }
}