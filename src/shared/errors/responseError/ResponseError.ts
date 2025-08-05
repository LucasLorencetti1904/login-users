export default abstract class ResponseError extends Error {
    public abstract readonly status: number;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}