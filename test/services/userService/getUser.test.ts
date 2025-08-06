import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserService from "@interfaces/services/UserService";
import UserServiceImpl from "@services/UserServiceImpl";
import MockRepository from "./MockRepository";
import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import MockValidator from "./MockValidator";
import MockRequestFormatter from "./MockRequestFormatter";
import MockResponseFormatter from "./MockResponseFormatter";
import BadRequestError from "@shared/errors/responseError/BadRequestError";

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

const returnedUserExample: UserModelDTO = {
    id: 1,
    ...validUserExample,
    birthDate: new Date("2005-04-19"),
    createdAt: new Date("2025-08-03"),
    updatedAt: new Date("2025-08-04")
};

const arrayWithAllReturnedUsers: UserModelDTO[] = [
    returnedUserExample,
    {
        id: 2,
        ...validUserExample,
        birthDate: new Date("2008-02-23"),
        createdAt: new Date("2025-04-19"),
        updatedAt: new Date("2025-09-27")
    }
];

const { password, ...safetyData } = returnedUserExample;

const formattedResponseUser: UserResponseDTO = {
    ...safetyData,
    birthDate: "19/04/2005",
    createdAt: "03/08/2025",
    updatedAt: "04/08/2025"
};

const arrayWithAllFormattedResponseUsers: UserResponseDTO[] = [
    formattedResponseUser,
    {
        id: 2,
        username: "user_example321",
        firstName: "Example",
        lastName: "User",
        email: "userexample2@gmail.com",
        birthDate: "2008-02-23",
        createdAt: "2025-04-19",
        updatedAt: "2025-09-27"
    }
]

let mockValidator: MockValidator;
let mockRequestFormatter: MockRequestFormatter;
let mockRepository: MockRepository;
let mockResponseFormatter: MockResponseFormatter;
let userService: UserServiceImpl;

const method: keyof UserService = "getUser";

describe (`${method} Service Method Test.`, () => {
    beforeEach (() => {
        vi.clearAllMocks();
        mockValidator = new MockValidator();
        mockRequestFormatter = new MockRequestFormatter();
        mockRepository = new MockRepository();
        mockResponseFormatter = new MockResponseFormatter();
        userService = new UserServiceImpl(
            mockValidator,
            mockRequestFormatter,
            mockRepository,
            mockResponseFormatter
        );
    });

    it ("returns a found user when id is provided.", async () => {
        mockRepository.method("getUserById").willReturn(returnedUserExample);

        mockValidator.doNotCall();
        mockRequestFormatter.doNotCall();
        mockRepository.callMethod("getUserById").withId(1);
        mockResponseFormatter.callWith(returnedUserExample);

        await expect (userService.getUser(1)).resolves.toEqual(formattedResponseUser);
    });

    it ("returns an array of users when id is not provided.", async () => {
        mockRepository.method("getAllUsers").willReturn(arrayWithAllReturnedUsers);

        mockValidator.doNotCall();
        mockRequestFormatter.doNotCall();
        mockRepository.callMethod("getUserById").withId(1);
        mockResponseFormatter.callWith(returnedUserExample);

        await expect (userService.getUser(1)).resolves.toEqual(arrayWithAllFormattedResponseUsers);
    });

    it ("throws a Not Found Error when user is not found.", async () => {
        mockRepository.method("getUserById").willReturn(null);

        mockValidator.doNotCall();
        mockRequestFormatter.doNotCall();
        mockRepository.callMethod("getUserById").withId(101);
        mockResponseFormatter.doNotCall();

        await expect (userService.getUser(101)).rejects.toThrow("User is not found.");
    });
});