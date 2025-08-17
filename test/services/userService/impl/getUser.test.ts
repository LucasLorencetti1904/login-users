import { beforeEach, describe, expect, it, vi } from "vitest";
import type UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import MockCreateUserValidator from "../mocks/MockCreateUserValidator";
import MockUpdateUserValidator from "../mocks/MockUpdateUserValidator";
import MockCreateRequestFormatter from "../mocks/MockCreateRequestFormatter";
import MockUpdateRequestFormatter from "../mocks/MockUpdateRequestFormatter";
import MockHasher from "../mocks/MockHasher";
import MockRepository from "../mocks/MockRepository";
import MockResponseFormatter from "../mocks/MockResponseFormatter";
import UserServiceImpl from "@services/UserServiceImpl";

const returnedUserExample: UserModelDTO = {
    id: 1,
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    email: "userexample@gmail.com",
    password: "$2b$10$hwex3g34xz9vplX0BdBvBevG0MzVJjYeJZV3pqv7uSYBHZ5ozH1Am",
    birthDate: new Date("2005-04-19"),
    createdAt: new Date("2025-08-03"),
    updatedAt: new Date("2025-08-04")
};

const arrayWithAllReturnedUsers: UserModelDTO[] = [
    returnedUserExample,
    {
        id: 2,
        username: "user_example123",
        firstName: "User",
        lastName: "Example",
        email: "userexample@gmail.com",
        password: "$2b$10$6X5yI28RtFG9S98cv2RMmOjljc8AjUNcc3NlV9gM8pMx8CnAfTe9G",
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
        birthDate: "23/02/2008",
        createdAt: "19/04/2025",
        updatedAt: "27/09/2025"
    }
];

let mockCreateUserValidator: MockCreateUserValidator;
let mockUpdateUserValidator: MockUpdateUserValidator;
let mockCreateRequestFormatter: MockCreateRequestFormatter;
let mockUpdateRequestFormatter: MockUpdateRequestFormatter;
let mockHasher: MockHasher;
let mockRepository: MockRepository;
let mockResponseFormatter: MockResponseFormatter;
let userService: UserServiceImpl;

const method: keyof UserServiceImpl = "getUser";

describe (`${method} Service Method Test.`, () => {
    beforeEach (() => {
        vi.clearAllMocks();
        mockCreateUserValidator = new MockCreateUserValidator();
        mockUpdateUserValidator = new MockUpdateUserValidator();
        mockCreateRequestFormatter = new MockCreateRequestFormatter();
        mockUpdateRequestFormatter = new MockUpdateRequestFormatter();
        mockHasher = new MockHasher();
        mockRepository = new MockRepository();
        mockResponseFormatter = new MockResponseFormatter();
        userService = new UserServiceImpl(
            mockCreateUserValidator,
            mockUpdateUserValidator,
            mockCreateRequestFormatter,
            mockUpdateRequestFormatter,
            mockHasher,
            mockRepository,
            mockResponseFormatter
        );
    });

    it ("returns a found user when id is provided.", async () => {
        mockRepository.method("getUserById").willReturn(returnedUserExample);
        mockResponseFormatter.method("formatModel").willReturn(formattedResponseUser);
        
        await expect (userService.getUser(1)).resolves.toEqual(formattedResponseUser);

        mockRepository.callMethod("getUserById").with(1);
        mockResponseFormatter.callWith(returnedUserExample);

    });

    it ("returns an array of all users when id is not provided.", async () => {
        mockRepository.method("getAllUsers").willReturn(arrayWithAllReturnedUsers);
        mockResponseFormatter.method("formatModel").willReturnSequence(arrayWithAllFormattedResponseUsers);

        await expect (userService.getUser()).resolves.toEqual(arrayWithAllFormattedResponseUsers);

        mockRepository.callMethod("getAllUsers").withoutArgument();
        mockResponseFormatter.callWith(arrayWithAllReturnedUsers[0]);
        mockResponseFormatter.callWith(arrayWithAllReturnedUsers[1]);
    });

    it ("throws a Not Found Error when user is not found.", async () => {
        mockRepository.method("getUserById").willReturn(null);

        await expect (userService.getUser(101)).rejects.toThrow("User not found.");
        
        mockRepository.callMethod("getUserById").with(101);
        mockResponseFormatter.doNotCall();
    });
});