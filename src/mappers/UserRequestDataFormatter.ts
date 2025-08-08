import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";
import type UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import capitalize from "@shared/utils/capitalize";

export default class UserRequestDataFormatter implements RequestDataMapper<UserCreateRequestDTO, UserFormattedDataDTO> {
    public formatRequest(request: UserCreateRequestDTO): UserFormattedDataDTO {
        return {
            username: request.username.trim(),
            firstName: this.capitalizeAndTrim(request.firstName),
            lastName: this.capitalizeAndTrim(request.lastName),
            birthDate: new Date(request.birthDate),
            email: request.email.toLowerCase().trim(),
            password: request.password
        };
    }

    private capitalizeAndTrim(field: string): string {
        return capitalize(field.trim());
    }
}