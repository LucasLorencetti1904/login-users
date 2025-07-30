export interface RequestDataMapper<RequestDataType, NormalizedDataType> {
    requestToFormatted(rawData: RequestDataType): NormalizedDataType,
}

export interface ResponseDataMapper<ModelType, ResponseDataType> {
    modelToResponse(model: ModelType): ResponseDataType
}