export default interface Validator<T> {
    validate(data: T): void;
}