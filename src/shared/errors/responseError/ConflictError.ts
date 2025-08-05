import ResponseError from "@shared/errors/responseError/ResponseError";

export default class ConflictError extends ResponseError {
    public readonly status: number = 409;

    constructor(message: string = "Conflict Error") {
        super(message);
    }
}