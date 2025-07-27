import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import type Mapper from "@mappers/Mapper";
import type UserModel from "@models/UserModel";
import capitalize from "@shared/utils/capitalize";

export default class UserDataMapper implements Mapper<UserRequestDTO, UserModel> {
    toModel(DTO: UserRequestDTO): UserModel {
        return {
            username: DTO.username.trim(),
            firstName: capitalize(DTO.firstName.trim()),
            lastName: capitalize(DTO.lastName.trim()),
            birthDate: new Date(DTO.birthDate.trim()),
            email: DTO.email.trim().toLowerCase()
        }
    }
}