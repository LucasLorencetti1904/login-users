export default interface RequestDataMapper<RequestDataType, NormalizedDataType> {
    formatRequest(rawData: RequestDataType): NormalizedDataType;
}