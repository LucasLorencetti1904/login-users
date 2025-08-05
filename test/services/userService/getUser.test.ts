import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserService from "@interfaces/services/UserService";
import UserServiceImpl from "@services/UserServiceImpl";
import MockRepository from "./MockRepository";
import { User } from "@prisma/client";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import MockValidator from "./MockValidator";
import MockRequestFormatter from "./MockRequestFormatter";
import MockResponseFormatter from "./MockResponseFormatter";

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

        mockValidator.callValidateMethodWith(validUserExample);
        mockRequestFormatter.callFormatRequestMethodWith(validUserExample);
        mockRepository.callMethod("getUserById").withId(1);
        mockResponseFormatter.callFormatModelMethodWith(returnedUserExample);

        expect (userService.getUser(1)).toEqual(formattedResponseUser);
    });
});