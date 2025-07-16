import errorMessage from "../../../constants/errorMessage";
import { EmailValidationError } from "../../errors/DataValidationError";

export default class NameValidator {
    private value: string;

    constructor(value: string) {
        this.value = value.trim();  

        this.validate();
    }

    public validate(): void {
        this.isEmpty(),
        this.isMissingSymbol(),
        this.startsWithInvalidCharacter(),
        this.tooSmall(),
        this.tooBig(),
        this.containsSpace()
    }
    
    private isEmpty(): void {
        const valueIsEmpty: boolean = !this.value;
        if (valueIsEmpty)
            throw new EmailValidationError("Email " + errorMessage.EMPTY);
    }

    private isMissingSymbol(): void {
        const notIncludesSymbol: boolean = !this.value.includes("@");
        if (notIncludesSymbol)
            throw new EmailValidationError("Email " + errorMessage.MISSING_SYMBOL);
    }

    private startsWithInvalidCharacter(): void {
        const firstChar: string = this.value[0]; 
        const firstCharIsNumber: boolean = /[^A-Za-z]/.test(firstChar);
        if (firstCharIsNumber)
            throw new EmailValidationError("Email " + errorMessage.STARTS_WITH_INVALID_CHARACTER);
    }

    private tooSmall(): void {
        const emailUser: string = this.value.split("@")[0];
        const lessThen4Characters: boolean = emailUser.length < 4;
        if (lessThen4Characters)
            throw new EmailValidationError("Email " + errorMessage.CONTAINS_LESS_THEN_4_CHARACTERS);
    }

    private tooBig(): void {
        const emailUser: string = this.value.split("@")[0];
        const greaterThen64Characters: boolean = emailUser.length > 64;
        if (greaterThen64Characters)
            throw new EmailValidationError("Email " + errorMessage.CONTAINS_MORE_THAN_64_CHARACTERS);
    }

    private containsSpace(): void {
        const hasSpace: boolean = this.value.includes(" ");
        if (hasSpace)
            throw new EmailValidationError("Email " + errorMessage.CONTAINS_SPACE);
    }
}