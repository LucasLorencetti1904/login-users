import { UsernameValidationError } from "../errors/DataValidationError";
import runAllMethods from "../helpers/runAllMethods";
import type DataValidator from "./DataValidator";

export default class UsernameValidator implements DataValidator {
    constructor(private value: string) {
        this.value = value.trim();

        this.validate();
    }

    public validate(): void {
        try {
            runAllMethods(this);
        }

        catch(e: unknown) {
            throw e as UsernameValidationError;
        }
    }

    private isEmpty(): void {
        const valueIsEmpty: boolean = !this.value;
        if (valueIsEmpty)
            throw new UsernameValidationError("Username cannot be empty.");
    }

    private startsWithNumber(): void {
        const firstChar: string = this.value[0]; 
        const firstCharIsNumber: boolean = /[0-9]/.test(firstChar);
        if (firstCharIsNumber)
            throw new UsernameValidationError("Username cannot start with a number.")
    }

    private tooSmall(): void {
        const lessThen4Characters: boolean = this.value.length < 4;
        if (lessThen4Characters)
            throw new UsernameValidationError("Username must contain a minimum of 4 characters.");
    }

    private tooBig(): void {
        const greaterThen10Characters: boolean = this.value.length > 10;
        if (greaterThen10Characters)
            throw new UsernameValidationError("Username must contain a maximum of 10 characters.");
    }

    private containsSpace(): void {
        const hasSpace: boolean = this.value.includes(" ");
        if (hasSpace)
            throw new UsernameValidationError("Username cannot contain spaces.");
    }

    private containsSpecialCharacters(): void {
        const hasSpecialCharacters: boolean = /[^a-zA-Z0-9_]/.test(this.value);
        if (hasSpecialCharacters)
            throw new UsernameValidationError("Username cannot contain special characters.");
    }
}