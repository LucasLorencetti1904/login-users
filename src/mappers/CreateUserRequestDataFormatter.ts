import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type CreateUserRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";
import type CreateUserParsedDTO from "@DTOs/UserDTO/CreateUserParsedDTO";
import capitalize from "@shared/utils/capitalize";

export default class CreateUserRequestDataFormatter implements RequestDataMapper<CreateUserRequestDTO, CreateUserParsedDTO> {
    public formatRequest(request: CreateUserRequestDTO): CreateUserParsedDTO {
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