import UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import capitalize from "@shared/utils/capitalize";
import RequestDataMapper from "./RequestDataMapper";

export default class UserDataMapper implements RequestDataMapper<UserRequestDTO, UserFormattedDataDTO> {
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
}