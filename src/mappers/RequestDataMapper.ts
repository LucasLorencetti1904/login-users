export default interface RequestDataMapper<RequestDataType, NormalizedDataType> {
    requestToFormatted(rawData: RequestDataType): NormalizedDataType,
}