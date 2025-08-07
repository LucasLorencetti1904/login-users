import { expect, Mock, vi } from "vitest";
import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import OneOrMany from "@shared/types/OneOrMany";

export default class MockRepository {
    public getUserById = vi.fn();
    public getAllUsers = vi.fn();

    public method(method: keyof MockRepository): any {
        return {
            willReturn: (data: OneOrMany<UserModelDTO> | null): void => {
                (this[method] as Mock).mockResolvedValue(data); 
            }
        };
    }

    public callMethod(method: keyof MockRepository): any {
        return {
            withoutArgument: (): void => {
                expect (this[method] as Mock).toHaveBeenCalledExactlyOnceWith();
            },

            withId: (id: number): void => {
                expect (this[method] as Mock).toHaveBeenCalledExactlyOnceWith(id);
            }
        };
    }
}