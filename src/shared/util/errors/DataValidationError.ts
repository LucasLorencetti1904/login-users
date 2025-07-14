abstract class DataValidationError extends Error {
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