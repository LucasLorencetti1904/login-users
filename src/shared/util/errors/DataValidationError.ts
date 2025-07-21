export abstract class DataValidationError extends Error {
    public abstract invalidPropertyName: string;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UsernameValidationError extends DataValidationError {
    public invalidPropertyName: string = "username";

    constructor(message: string) {
        super(message);
    }
}

export class NameValidationError extends DataValidationError {
    public invalidPropertyName: string = "name";

    constructor(message: string) {
        super(message);
    }
}

export class EmailValidationError extends DataValidationError {
    public invalidPropertyName: string = "email";

    constructor(message: string) {
        super(message);
    }
}

export class PasswordValidationError extends DataValidationError {
    public invalidPropertyName: string = "password";

    constructor(message: string) {
        super(message);
    }
}