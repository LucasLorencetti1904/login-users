export default interface FieldValidator {
    validate(field: unknown): void;
}