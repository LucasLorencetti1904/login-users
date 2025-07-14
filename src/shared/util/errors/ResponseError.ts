abstract class ResponseError extends Error {
    public abstract readonly status: number;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class InternalError extends ResponseError {
    public readonly status: number = 500;

    constructor(message: string = "Internal Server Error") {
        super(message);
    }
}

export class BadRequestError extends ResponseError {
    public readonly status: number = 400;

    constructor(message: string = "Bad Request Error") {
        super(message);
    }
}

export class NotFoundError extends ResponseError {
    public readonly status: number = 404;

    constructor(message: string = "Not Found Error") {
        super(message);
    }
}

export class ConflictError extends ResponseError {
    public readonly status: number = 409;

    constructor(message: string = "Conflict Error") {
        super(message);
    }
}