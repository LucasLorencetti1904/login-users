import { expect, Mock, vi } from "vitest";
import type UserDataMapper from "@interfaces/mappers/UserDataMapper";
import type { CreateUserRequestDTO, CreateUserParsedDTO } from "@DTOs/UserDTO/CreateUserDTO";
import type { UpdateUserRequestDTO } from "@DTOs/UserDTO/UpdateUserDTO";
import type { UserModelDTO } from "@DTOs/UserDTO/UserOutputDTO";

export default class MockUserDataFormatter implements UserDataMapper {
    public formatCreateRequest = vi.fn();
    public formatUpdateRequest: Mock = vi.fn();
    public formatResponse: Mock = vi.fn();

    public method(method: keyof MockUserDataFormatter): any {
        return {
            willReturn: (data: CreateUserParsedDTO): void => {
                (this[method] as Mock).mockReturnValue(data); 
            }
        };
    }

    public callMethod(method: keyof MockUserDataFormatter) {
        return {
            with: (data: CreateUserRequestDTO | UpdateUserRequestDTO | UserModelDTO): void => {
                expect (this[method] as Mock).toHaveBeenCalledExactlyOnceWith(data);
            }
        }
    }

    public doNotCallMethod(method: keyof MockUserDataFormatter): void {
        expect (this[method] as Mock).not.toHaveBeenCalled();
    }
}