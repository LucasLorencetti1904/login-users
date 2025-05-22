import { beforeEach, describe, vi } from "vitest";
import UserController from "../../src/controllers/userController";
import UserService from "../../src/services/userService";
import { it } from "node:test";
import { User, UserModel } from "../../src/domain/schemas/UserSchema";

const mockUserService: UserService = {
    getUser: vi.fn<(id?: number) => Promise<UserModel | UserModel[] | null>>() 
} as unknown as UserService;

const userController: UserController = new UserController(mockUserService as UserService)

describe ('listUser', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it ("Return user and status 200", async () => {
        const mockUser: User = {
            fullName: "Arnold Soneguade",
            username: "arnoldSoneguade023r",
            email: "arnoldsoneguade@gmail.com",
            password: "arnold12345"
        };
        mockUserService.getUser.mockResolveValue(mockUser);
    })
});