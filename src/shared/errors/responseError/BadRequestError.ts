import ResponseError from "@shared/errors/responseError/ResponseError";

export default class BadRequestError extends ResponseError {
    public readonly status: number = 400;

    constructor(message: string = "Bad Request Error") {
        super(message);
    }
}