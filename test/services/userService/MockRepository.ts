import { expect, Mock, vi } from "vitest";
import { User } from "@prisma/client";

type RepositoryMethod = keyof MockRepository;
type DataFormat = User | User[] | null;

export default class MockRepository {
    public getUserById = vi.fn()

    public method(method: RepositoryMethod): any {
        return {
            willReturn: (data: DataFormat): void => {
                (this[method] as Mock).mockResolvedValue(data); 
            },
            willThrown: (error: Error): void => {
                (this[method] as Mock).mockRejectedValue(error);
            }
        };
    }

    public callMethod(method: RepositoryMethod): any {
        return {
            withId: (id: string): void => {
                expect (this[method] as Mock).toHaveBeenCalledExactlyOnceWith(id);
            }
        };
    }
}