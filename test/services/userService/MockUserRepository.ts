import { expect, Mock, vi } from "vitest";
import { User } from "@prisma/client";

type UserRepositoryMethod = keyof MockUserRepository;
type DataFormat = User | User[] | null;

export default class MockUserRepository {
    public getUserById = vi.fn()

    public method(method: UserRepositoryMethod): any {
        return {
            willReturn: (data: DataFormat): void => {
                (this[method] as Mock).mockResolvedValue(data); 
            },
            willThrown: (error: Error): void => {
                (this[method] as Mock).mockRejectedValue(error);
            }
        };
    }

    public callMethod(method: UserRepositoryMethod): any {
        return {
            withId: (id: string): void => {
                expect (this[method] as Mock).toHaveBeenCalledExactlyOnceWith(id);
            }
        };
    }
}