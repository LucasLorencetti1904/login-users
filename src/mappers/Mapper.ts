export default interface ResponseDataMapper<ModelType, ResponseDataType> {
    modelToResponse(model: ModelType): ResponseDataType
}

export interface RequestDataMapper<RawDataType, NormalizedDataType> {
    rawToNormalized(rawData: RawDataType): NormalizedDataType,
}