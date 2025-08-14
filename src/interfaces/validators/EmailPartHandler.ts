export default interface EmailPartHandler {
    handle(emailPart: string): void;
}