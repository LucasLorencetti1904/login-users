export default interface ResponseDataMapper<Model, Response> {
    formatModel(model: Model): Response;
}