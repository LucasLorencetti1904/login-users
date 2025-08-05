import ResponseError from "@shared/errors/responseError/ResponseError";

export default class InternalError extends ResponseError {
    public readonly status: number = 500;

    constructor(message: string = "Internal Server Error") {
        super(message);
    }
}