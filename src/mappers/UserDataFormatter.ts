import type UserDataMapper from "@interfaces/mappers/UserDataMapper";
import type { CreateUserParsedDTO, CreateUserRequestDTO } from "@DTOs/UserDTO/CreateUserDTO";
import type { UpdateUserParsedDTO, UpdateUserRequestDTO } from "@DTOs/UserDTO/UpdateUserDTO";
import type { UserModelDTO, UserResponseDTO } from "@DTOs/UserDTO/UserOutputDTO";
import formatDateToDDMMYYYY from "@shared/utils/formatDateToDDMMYYYY";
import capitalize from "@shared/utils/capitalize";

export default class UserDataFormatter implements UserDataMapper {
    public formatCreateRequest(request: CreateUserRequestDTO): CreateUserParsedDTO {
        return {
            username: request.username.trim(),
            firstName: this.capitalizeAndTrim(request.firstName),
            lastName: this.capitalizeAndTrim(request.lastName),
            birthDate: new Date(request.birthDate),
            email: request.email.toLowerCase().trim(),
            password: request.password
        };
    }

    public formatUpdateRequest(request: UpdateUserRequestDTO): UpdateUserParsedDTO {
        return {
            username: request.username?.trim(),
            firstName: request.firstName ? this.capitalizeAndTrim(request.firstName) : undefined,
            lastName: request.lastName ? this.capitalizeAndTrim(request.lastName) : undefined,
            birthDate: request.birthDate ? new Date(request.birthDate) : undefined,
            email: request.email?.toLowerCase().trim(),
            password: request.password
        };
    }

    public formatResponse(model: UserModelDTO): UserResponseDTO {
        const { password, ...safityFields } = model;

        return {
            ...safityFields,
            birthDate: formatDateToDDMMYYYY(model.birthDate),
            createdAt: formatDateToDDMMYYYY(model.createdAt),
            updatedAt: formatDateToDDMMYYYY(model.updatedAt)
        };
    };

    private capitalizeAndTrim(field: string): string {
        return capitalize(field.trim());
    }
}