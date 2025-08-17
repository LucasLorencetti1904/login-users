export default interface RequestDataMapper<Request, Parsed> {
    formatRequest(request: Request): Parsed;
}