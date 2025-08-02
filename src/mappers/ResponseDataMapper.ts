export default interface ResponseDataMapper<ModelType, ResponseDataType> {
    formatModel(model: ModelType): ResponseDataType;
}