import type UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";

export default interface UserValidator {
    validate(data: UserCreateRequestDTO): void;
}