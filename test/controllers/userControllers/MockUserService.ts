import { vi, expect, Mock } from "vitest";
import type OneOrMany from "@shared/types/OneOrMany";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import type UserService from "@interfaces/services/UserService";
import MockRequest from "./MockRequest";

type UserServiceMethod = keyof MockUserService;
type DataFormat = OneOrMany<UserResponseDTO> | null;

export default class MockUserService implements UserService {
    public readonly getUser = vi.fn();
    public readonly createUser = vi.fn();
    public readonly updateUser = vi.fn();
    public readonly deleteUser = vi.fn();

    public constructor (private readonly req: MockRequest) {}

    public method(method: UserServiceMethod): any {
        return {
            willReturn: (data: DataFormat): void => {
                (this[method] as Mock).mockResolvedValue(data); 
            },
            willThrown: (error: Error): void => {
                (this[method] as Mock).mockRejectedValue(error);
            }
        };
    }

    public callCurrentParamsIdWithMethod(method: UserServiceMethod): void {
        expect (this[method]).toHaveBeenCalledExactlyOnceWith(Number(this.req.params.id));
    }

    public callCurrentBodyDataWithMethod(method: UserServiceMethod): void {
        expect (this[method]).toHaveBeenCalledExactlyOnceWith(this.req.body);
    }

    public callCurrentParamsIdAndBodyDataWithMethod(method: UserServiceMethod): void {
        expect (this[method]).toHaveBeenCalledExactlyOnceWith(
            Number(this.req.params.id),
            this.req.body
        );
    }
}