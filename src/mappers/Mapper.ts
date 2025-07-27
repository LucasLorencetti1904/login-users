export default interface Mapper<DTOType, ModelType> {
    toModel(DTO: DTOType): ModelType,
    toDTO(ModelData: ModelType): DTOType
}