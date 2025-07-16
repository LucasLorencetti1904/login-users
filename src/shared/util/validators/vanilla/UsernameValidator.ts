import errorMessage from "../../../constants/errorMessage";
import { UsernameValidationError } from "../../errors/DataValidationError";

export default class UsernameValidator {
    private value: string;

    constructor(value: string) {
        this.value = value.trim();

        this.validate();
    }

    public validate(): void {
        this.isEmpty(),
        this.startsWithNumber(),
        this.tooSmall(),
        this.tooBig(),
        this.containsSpace(),
        this.containsSpecialCharacters()
    }

    private isEmpty(): void {
        const valueIsEmpty: boolean = !this.value;
        if (valueIsEmpty)
            throw new UsernameValidationError("Username " + errorMessage.EMPTY);
    }

    private startsWithNumber(): void {
        const firstChar: string = this.value[0]; 
        const firstCharIsNumber: boolean = /[0-9]/.test(firstChar);
        if (firstCharIsNumber)
            throw new UsernameValidationError("Username " + errorMessage.STARTS_WITH_NUMBER);
    }

    private tooSmall(): void {
        const lessThen4Characters: boolean = this.value.length < 4;
        if (lessThen4Characters)
            throw new UsernameValidationError("Username " + errorMessage.CONTAINS_LESS_THEN_4_CHARACTERS);
    }

    private tooBig(): void {
        const greaterThen10Characters: boolean = this.value.length > 10;
        if (greaterThen10Characters)
            throw new UsernameValidationError("Username " + errorMessage.CONTAINS_MORE_THAN_10_CHARACTERS);
    }

    private containsSpace(): void {
        const hasSpace: boolean = this.value.includes(" ");
        if (hasSpace)
            throw new UsernameValidationError("Username " + errorMessage.CONTAINS_SPACE);
    }

    private containsSpecialCharacters(): void {
        const hasSpecialCharacters: boolean = /[^a-zA-Z0-9_]/.test(this.value);
        if (hasSpecialCharacters)
            throw new UsernameValidationError("Username " + errorMessage.CONTAINS_SPECIAL_CHARACTERS);
    }
}