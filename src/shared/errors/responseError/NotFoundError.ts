import ResponseError from "@shared/errors/responseError/ResponseError";

export default class NotFoundError extends ResponseError {
    public readonly status: number = 404;

    constructor(message: string = "Not Found Error") {
        super(message);
    }
}