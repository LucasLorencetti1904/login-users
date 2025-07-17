import { EMAIL_SECOND_LEVEL_DOMAIN, EMAIL_TOP_LEVEL_DOMAIN, EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE } from "../../../constants/emailDomains";
import ErrorMessageGenerator from "../../../helpers/ErrorMessageGenerator";
import type { EmailSecondLevelDomain, EmailTopLevelDomain, EmailTopLevelDomainCountryCode } from "../../../types/emailDomainTypes";
import type { Maybe } from "../../../types/optionalTypes";
import { EmailValidationError } from "../../errors/DataValidationError";
import VanillaDataValidator from "./VanillaUserDataValidator";

export default class EmailValidator extends VanillaDataValidator<EmailValidationError> {
    private symbol: string = "@";
    
    private user: string;
    private domain: string;
    
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email");
    
    constructor(private email: string) {
        super(email);

        const [user, domain] = this.splitEmailIfIsNotEmptyAndContainsSymbol();

        this.user = user;
        this.domain = domain;
        
        this.validate();
    }

    protected createError(message: string): EmailValidationError {
        return new EmailValidationError(message);
    }
    
    public validate(): void {
        this.failsIf (
            this.containsSpaces(), this.errorMessage.contains("spaces")
        );

        this.failsIf (
            this.startsWithInvalidCharacter(), this.errorMessage.startsWith("invalid characters")
        );

        this.failsIf (
            this.tooShort(), this.errorMessage.minLength(4)
        );
        this.failsIf (
            this.tooLong(), this.errorMessage.maxLength(64)
        );
        this.failsIf (
            this.domainHasAnInvalidFormat(), this.errorMessage.hasAnInvalidFormat
        );
    }
    
    private splitEmailIfIsNotEmptyAndContainsSymbol(): string[] {
        this.failsIf (
            this.isEmpty(), this.errorMessage.isEmpty
        );
        this.failsIf (
            this.notContainsSymbol(), this.errorMessage.missing(this.symbol)
        );
        
        return this.email.split(this.symbol);     
    }

    private notContainsSymbol(): boolean {
        return !this.email.includes(this.symbol);
    }
    
    private isEmpty(): boolean {
        return !this.email;
    }
    
    private containsSpaces(): boolean {
        return this.email.includes(" ");
    }

    private startsWithInvalidCharacter(): boolean {
        const firstChar: string = this.email[0]; 
        return !/^[a-zA-Z]$/.test(firstChar);    }

    private tooShort(): boolean {
        return this.user.length < 4;
    }

    private tooLong(): boolean {
        return this.user.length > 64;
    }

    private domainHasAnInvalidFormat(): boolean {
        const validTopLevelDomain: boolean = !this.topLevelDomainInvalidFormat();
        const validTopLevelDomainCountryCode: boolean = !this.topLevelDomainCountryCodeInvalidFormat();
        const validSecondLevelDomain: boolean = !this.secondLevelDomainInvalidFormat();

        const validFullTopDomain: boolean = validTopLevelDomain && validTopLevelDomainCountryCode;
        
        const allDomainPartsIsValid: boolean = validFullTopDomain && validSecondLevelDomain;
        
        return !allDomainPartsIsValid;
    }

    private topLevelDomainInvalidFormat(): boolean {
        const topLevelDomain: Maybe<EmailTopLevelDomain> = this.getTopLevelDomain();
        const notContainTopLevel: boolean = !topLevelDomain;

        if (notContainTopLevel)
            return true;

        const isInvalidFormat: boolean = !EMAIL_TOP_LEVEL_DOMAIN.includes(topLevelDomain!);

        return isInvalidFormat;
    }

    private topLevelDomainCountryCodeInvalidFormat(): boolean {
        const countryCode: Maybe<EmailTopLevelDomainCountryCode> = this.getTopLevelDomainCountryCode();
        const notContainCountryCode: boolean = !countryCode;

        if (notContainCountryCode)
            return false;
            
        const isInvalidFormat: boolean = !EMAIL_TOP_LEVEL_DOMAIN_COUNTRY_CODE.includes(countryCode!);
        
        return isInvalidFormat;
    }

    private secondLevelDomainInvalidFormat(): boolean {
        const secondLevelDomain: Maybe<EmailSecondLevelDomain> = this.getSecondLevelDomain();
        const notContainSecondLevel: boolean = !secondLevelDomain;

        if (notContainSecondLevel)
            return true;

        const isInvalidFormat: boolean = !EMAIL_SECOND_LEVEL_DOMAIN.includes(secondLevelDomain!);

        return isInvalidFormat;
    }

    private getTopLevelDomain(): Maybe<EmailTopLevelDomain> {
        return this.domain.split(".")[1];
    }

    private getTopLevelDomainCountryCode(): Maybe<EmailTopLevelDomainCountryCode> {
         return this.domain.split(".")[2];
    }
    
    private getSecondLevelDomain(): Maybe<EmailSecondLevelDomain> {
        return this.domain.split(".")[0];
    }
}