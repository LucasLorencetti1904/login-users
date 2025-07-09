export abstract class ApplicationError extends Error {
    public abstract status: number;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InternalError extends ApplicationError {
    public status: number = 500;

    constructor(message: string = "Internal Server Error") {
        super(message);
        this.name = this.constructor.name;
    }
}

export class BadRequestError extends ApplicationError {
    public status: number = 400;

    constructor(message: string = "Bad Request Error") {
        super(message);
        this.name = this.constructor.name;
    }
}

export class NotFoundError extends ApplicationError {
    public status: number = 404;

    constructor(message: string = "Not Found Error") {
        super(message);
        this.name = this.constructor.name;
    }
}

export class ConflictError extends ApplicationError {
    public status: number = 409;

    constructor(message: string = "Conflict Error") {
        super(message);
        this.name = this.constructor.name;
    }
}