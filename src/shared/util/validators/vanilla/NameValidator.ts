import errorMessage from "../../../constants/errorMessage";
import { NameValidationError } from "../../errors/DataValidationError";

export default class NameValidator {
    private value: string;

    constructor(value: string) {
        this.value = value.trim();

        this.validate();
    }

    public validate(): void {
        this.isEmpty(),
        this.containsNumber(),
        this.tooSmall(),
        this.tooBig(),
        this.containsSpace(),
        this.containsSpecialCharacters()
    }

    private isEmpty(): void {
        const valueIsEmpty: boolean = !this.value;
        if (valueIsEmpty)
            throw new NameValidationError("Name " + errorMessage.EMPTY);
    }

    private containsNumber(): void {
        const containsNumber: boolean = /[0-9]/.test(this.value);
        if (containsNumber)
            throw new NameValidationError("Name " + errorMessage.CONTAINS_NUMBER);
    }

    private tooSmall(): void {
        const lessThen4Characters: boolean = this.value.length < 4;
        if (lessThen4Characters)
            throw new NameValidationError("Name " + errorMessage.CONTAINS_LESS_THEN_4_CHARACTERS);
    }

    private tooBig(): void {
        const greaterThen14Characters: boolean = this.value.length > 14;
        if (greaterThen14Characters)
            throw new NameValidationError("Name " + errorMessage.CONTAINS_MORE_THAN_14_CHARACTERS);
    }

    private containsSpace(): void {
        const hasSpace: boolean = this.value.includes(" ");
        if (hasSpace)
            throw new NameValidationError("Name " + errorMessage.CONTAINS_SPACE);
    }

    private containsSpecialCharacters(): void {
        const hasSpecialCharacters: boolean = /[^a-zA-Z]/.test(this.value);
        if (hasSpecialCharacters)
            throw new NameValidationError("Name " + errorMessage.CONTAINS_SPECIAL_CHARACTERS);
    }
}