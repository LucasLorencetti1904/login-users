import ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import { User } from "@prisma/client";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import formatDateToDDMMYYYY from "@shared/utils/formatDateToDDMMYYYY";

export default class UserResponseDataFormatter implements ResponseDataMapper<User, UserResponseDTO> {
    public formatModel(model: User): UserResponseDTO {
        const { password, ...safityFields } = model;

        return {
            ...safityFields,
            birthDate: formatDateToDDMMYYYY(model.birthDate),
            createdAt: formatDateToDDMMYYYY(model.createdAt),
            updatedAt: formatDateToDDMMYYYY(model.updatedAt)
        };
    };
}