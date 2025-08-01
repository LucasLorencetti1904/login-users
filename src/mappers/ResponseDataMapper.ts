export default interface ResponseDataMapper<ModelType, ResponseDataType> {
    modelToResponse(model: ModelType): ResponseDataType
}