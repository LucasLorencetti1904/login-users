import { CreateUserParsedDTO, CreateUserRequestDTO } from "@DTOs/UserDTO/CreateUserDTO";
import { UpdateUserParsedDTO, UpdateUserRequestDTO } from "@DTOs/UserDTO/UpdateUserDTO";

export type UserRequestDTO = CreateUserRequestDTO | UpdateUserRequestDTO;

export type UserParsedDTO = CreateUserParsedDTO | UpdateUserParsedDTO;