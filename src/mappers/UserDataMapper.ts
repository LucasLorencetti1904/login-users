import UserCreateDataDTO from "@DTOs/UserDTO/UserCreateDataDTO";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import ResponseDataMapper, { RequestDataMapper } from "@mappers/Mapper";
import { User } from "@prisma/client";
import capitalize from "@shared/utils/capitalize";

export default class UserDataMapper 
implements RequestDataMapper<UserRequestDTO, UserCreateDataDTO>,
ResponseDataMapper<User, UserResponseDTO> {
   rawToNormalized(rawData: UserRequestDTO): UserCreateDataDTO {
       return {
        username: rawData.username.trim(),
        firstName: capitalize(rawData.firstName.trim()),
        lastName: capitalize(rawData.lastName.trim()),
        birthDate: new Date(rawData.birthDate.trim()),
        email: rawData.email.trim().toLowerCase(),
       }
   } 
}