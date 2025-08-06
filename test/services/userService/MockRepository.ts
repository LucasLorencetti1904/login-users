import { expect, Mock, vi } from "vitest";
import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";

type RepositoryMethod = keyof MockRepository;
type DataFormat = UserModelDTO | UserModelDTO[] | null;

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