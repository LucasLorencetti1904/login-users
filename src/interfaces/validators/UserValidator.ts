import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";

export default interface UserValidator {
    validate(data: UserRequestDTO): void;
}