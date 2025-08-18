import { expect, Mock, vi } from "vitest";
import type UserRepository from "@interfaces/repositories/UserRepository";
import type { UserModelDTO } from "@DTOs/UserDTO/UserOutputDTO";
import type OneOrMany from "@shared/types/OneOrMany";

export default class MockRepository implements UserRepository {
    public getUserById = vi.fn();
    public getUserByEmail = vi.fn();
    public getUserByUsername = vi.fn();
    public getAllUsers = vi.fn();
    public createUser = vi.fn();

    public method(method: keyof MockRepository): any {
        return {
            willReturn: (data: OneOrMany<UserModelDTO> | null): void => {
                (this[method] as Mock).mockResolvedValue(data); 
            }
        };
    }

    public doNotCallMethod(method: keyof MockRepository): void {
        expect (this[method] as Mock).not.toHaveBeenCalled();
    }

    public callMethod(method: keyof MockRepository): any {
        return {
            withoutArgument: (): void => {
                expect (this[method] as Mock).toHaveBeenCalledExactlyOnceWith();
            },

            with: (data: any): void => {
                expect (this[method] as Mock).toHaveBeenCalledExactlyOnceWith(data);
            }
        };
    }
}