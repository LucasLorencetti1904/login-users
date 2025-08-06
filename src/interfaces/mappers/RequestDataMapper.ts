export default interface RequestDataMapper<RequestDataType, NormalizedDataType> {
    formatRequest(request: RequestDataType): NormalizedDataType;
}