import UserFieldValidatorBuilder from "@validators/fieldValidators/impl/user/builders/UserFieldValidatorBuilder";
import type EmailPartHandler from "@interfaces/validators/EmailPartHandler";
import EmailValidator from "@validators/fieldValidators/impl/user/impl/email/EmailValidator";

export default class EmailValidatorBuilder extends UserFieldValidatorBuilder {
    userPartHandler!: EmailPartHandler;
    domainPartHandler!: EmailPartHandler;

    public withUserPartHandler(handler: EmailPartHandler): this {
        this.userPartHandler = handler;
        return this;
    }

    public withDomainPartHandler(handler: EmailPartHandler): this {
        this.domainPartHandler = handler;
        return this;
    }

    public build(): EmailValidator {
        if (this.isMissingFieldName() || this.isMissingDependencies()) {
            throw new Error("Email is missing field name or dependencies.");
        }

        return new EmailValidator(this.fieldName, this.userPartHandler, this.domainPartHandler)
    }

    private isMissingDependencies(): boolean {
        return !this.userPartHandler || !this.domainPartHandler;
    }
}