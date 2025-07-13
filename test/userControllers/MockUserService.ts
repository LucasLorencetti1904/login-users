import { vi, expect, Mock } from "vitest";
import { UserModel } from "../../src/entities/User";
import MockRequest from "./MockRequest";

type UserServiceMethod = keyof MockUserService;
type DataFormat = UserModel | UserModel[] | null;

export default class MockUserService {
    public readonly getUser = vi.fn();
    public readonly createUser = vi.fn();
    public readonly updateUser = vi.fn();
    public readonly deleteUser = vi.fn();

    public constructor (private readonly req: MockRequest) {}

    public methodWillBeReturns(method: UserServiceMethod, data: DataFormat): void {
        (this[method] as Mock).mockResolvedValue(data);
    }

    public methodWillBeThrows(method: UserServiceMethod, error: Error): void {
        (this[method] as Mock).mockRejectedValue(error);
    }

    public callCurrentParamsIdWithMethod(method: UserServiceMethod): void {
        expect (this[method]).toHaveBeenCalledExactlyOnceWith(this.req.params.id);
    }

    public callCurrentBodyDataWithMethod(method: UserServiceMethod): void {
        expect (this[method]).toHaveBeenCalledExactlyOnceWith(this.req.body);
    }

    public callCurrentParamsIdAndBodyDataWithMethod(method: UserServiceMethod): void {
        expect (this[method]).toHaveBeenCalledExactlyOnceWith(this.req.params.id, this.req.body);
    }
}