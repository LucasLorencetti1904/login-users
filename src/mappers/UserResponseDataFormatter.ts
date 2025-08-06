import ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import formatDateToDDMMYYYY from "@shared/utils/formatDateToDDMMYYYY";

export default class UserResponseDataFormatter implements ResponseDataMapper<UserModelDTO, UserResponseDTO> {
    public formatModel(model: UserModelDTO): UserResponseDTO {
        const { password, ...safityFields } = model;

        return {
            ...safityFields,
            birthDate: formatDateToDDMMYYYY(model.birthDate),
            createdAt: formatDateToDDMMYYYY(model.createdAt),
            updatedAt: formatDateToDDMMYYYY(model.updatedAt)
        };
    };
}