import UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import { ResponseDataMapper, RequestDataMapper } from "@mappers/Mapper";
import { User } from "@prisma/client";
import capitalize from "@shared/utils/capitalize";
import formatDateToDDMMYYYY from "@shared/utils/formatDateToDDMMYYYY";

export default class UserDataMapper implements 
RequestDataMapper<UserRequestDTO, UserFormattedDataDTO>,
ResponseDataMapper<User, UserResponseDTO> {
    public requestToFormatted(request: UserRequestDTO): UserFormattedDataDTO {
        return {
            username: request.username.trim(),
            firstName: capitalize(request.firstName.trim()),
            lastName: capitalize(request.lastName.trim()),
            birthDate: new Date(request.birthDate.trim()),
            email: request.email.toLowerCase().trim(),
            password: request.password
        };
    }

    public modelToResponse(model: User): UserResponseDTO {
        return {
            id: model.id,
            username: model.username,
            firstName: model.firstName,
            lastName: model.lastName,
            birthDate: formatDateToDDMMYYYY(model.birthDate),
            email: model.email,
            createdAt: formatDateToDDMMYYYY(model.createdAt),
            updatedAt: formatDateToDDMMYYYY(model.updatedAt)
        }
    }
}