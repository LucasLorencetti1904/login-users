import { expect, Mock, vi } from "vitest";
import type UserDataMapper from "@interfaces/mappers/UserDataMapper";
import type { CreateUserRequestDTO, CreateUserParsedDTO } from "@DTOs/UserDTO/CreateUserDTO";
import type { UpdateUserRequestDTO, UpdateUserParsedDTO } from "@DTOs/UserDTO/UpdateUserDTO";
import type { UserResponseDTO } from "@DTOs/UserDTO/UserOutputDTO";

type TheseKeys = keyof MockUserDataFormatter

type PossibleReturnTypes = (
    | CreateUserRequestDTO
    | CreateUserParsedDTO
    | UpdateUserRequestDTO
    | UpdateUserParsedDTO
    | UserResponseDTO
);

export default class MockUserDataFormatter implements UserDataMapper {
    public formatCreateRequest: Mock = vi.fn();
    public formatUpdateRequest: Mock = vi.fn();
    public formatResponse: Mock = vi.fn();

    public method(method: TheseKeys): any {
        return {
            willReturn: (data: PossibleReturnTypes): void => {
                (this[method] as Mock).mockReturnValue(data); 
            },

            willReturnSequence: (data: PossibleReturnTypes[]): void => {
                data.forEach((eachData) => {
                    (this[method] as Mock).mockReturnValueOnce(eachData);
                });
            }
        };
    }

    public callMethod(method: TheseKeys) {
        return {
            with: (data: PossibleReturnTypes): void => {
                expect (this[method] as Mock).toHaveBeenCalledWith(data);
            }
        }
    }

    public doNotCallMethod(method: TheseKeys): void {
        expect (this[method] as Mock).not.toHaveBeenCalled();
    }
}