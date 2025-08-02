import RequestDataMapper from "@mappers/RequestDataMapper";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import capitalize from "@shared/utils/capitalize";

export default class UserRequestDataFormatter implements RequestDataMapper<UserRequestDTO, UserFormattedDataDTO> {
    public formatRequest(request: UserRequestDTO): UserFormattedDataDTO {
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