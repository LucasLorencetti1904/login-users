import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserService from "@services/UserService";
import UserServiceImpl from "@services/UserServiceImpl";
import MockUserRepository from "./MockUserRepository";
import { User } from "@prisma/client";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

const validUserExample: UserRequestDTO = {
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: "2005-04-19",
    email: "userexample@gmail.com",
    password: "UserExample123!*"
};

const invalidUserExample: UserRequestDTO = {
    username: "user example 123",
    firstName: "Us er",
    lastName: "Ex3mpl3",
    birthDate: "19/04/2005",
    email: "user example @random.com",
    password: "12345"
};

const returnedUserExample: User = {
    id: 1,
    ...validUserExample,
    birthDate: new Date("2005-04-19"),
    createdAt: new Date("2025-08-03"),
    updatedAt: new Date("2025-08-04")
};

const { password, ...safetyData } = returnedUserExample;

const formattedResponseUser: UserResponseDTO = {
    ...safetyData,
    birthDate: "19/04/2005",
    createdAt: "03/08/2025",
    updatedAt: "04/08/2025"
};

const otherReturnedUserExample: User = {
    id: 2,
    ...validUserExample,
    birthDate: new Date("2008-02-23"),
    createdAt: new Date("2025-04-19"),
    updatedAt: new Date("2025-09-27")
};

const arrayWithAllReturnedUsers: User[] = [
    returnedUserExample,
    otherReturnedUserExample
];

let mockUserRepository: MockUserRepository;
let userService: UserServiceImpl;

const method: keyof UserService = "getUser";

describe (`${method} Service Method Test.`, () => {
    beforeEach (() => {
        vi.clearAllMocks();
        mockUserRepository = new MockUserRepository();
        userService = new UserServiceImpl(mockUserRepository);
    });

    it ("returns a found user when id is provided.", async () => {
        mockUserRepository.method("getUserById").willReturn(returnedUserExample);

        mockUserRepository.callMethod("getUserById").withId("1");

        expect (await userService.getUser("1")).not.toEqual(returnedUserExample);

        expect (await userService.getUser("1")).toEqual(formattedResponseUser);
    });
});