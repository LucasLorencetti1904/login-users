import { beforeEach, describe, expect, it, vi } from "vitest";
import type UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";
import type UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import type UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import UserServiceImpl from "@services/UserServiceImpl";
import MockValidator from "./MockValidator";
import MockRequestFormatter from "./MockRequestFormatter";
import MockHasher from "./MockHasher";
import MockRepository from "./MockRepository";
import MockResponseFormatter from "./MockResponseFormatter";
import ConflictError from "@shared/errors/responseError/ConflictError";
import BadRequestError from "@shared/errors/responseError/BadRequestError";

const validUser: UserCreateRequestDTO = {
    username: "    user_example123   ",
    firstName: "   USER ",
    lastName: "example     ",
    birthDate: " 2005-04-19  ",
    email: "     userExAmpLE@gmAIl.cOM  ",
    password: " UserExample123!*  "
};

const invalidUser: UserCreateRequestDTO = {
    username: "  user example 123",
    firstName: "    Us er",
    lastName: "Ex3mpl3    ",
    birthDate: "  19/04/2005  ",
    email: "  user example @random.com",
    password: "   12345"
};

const formattedUserData: UserFormattedDataDTO = {
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: new Date("2005-04-19"),
    email: "userexample@gmail.com",
    password: " UserExample123!*  "
};

const formattedUserDataWithHashedPassword: UserFormattedDataDTO = {
    ...formattedUserData,
    password: "$2b$10$hwex3g34xz9vplX0BdBvBevG0MzVJjYeJZV3pqv7uSYBHZ5ozH1Am"
};

const alreadyExistentUser: UserModelDTO = {
    id: 1,
    ...formattedUserData,
    birthDate: new Date("2005-04-19"),
    createdAt: new Date("2025-08-03"),
    updatedAt: new Date("2025-08-04")
};

const creatededUser: UserModelDTO = alreadyExistentUser;

const { password, ...safetyData } = creatededUser;

const formattedResponseUser: UserResponseDTO = {
    ...safetyData,
    birthDate: "19/04/2005",
    createdAt: "03/08/2025",
    updatedAt: "04/08/2025"
};

let mockValidator: MockValidator;
let mockRequestFormatter: MockRequestFormatter;
let mockHasher: MockHasher;
let mockRepository: MockRepository;
let mockResponseFormatter: MockResponseFormatter;
let userService: UserServiceImpl;

const method: keyof UserServiceImpl = "createUser";

describe (`${method} Service Method Test.`, () => {
    beforeEach (() => {
        vi.clearAllMocks();
        mockValidator = new MockValidator();
        mockRequestFormatter = new MockRequestFormatter();
        mockHasher = new MockHasher();
        mockRepository = new MockRepository();
        mockResponseFormatter = new MockResponseFormatter();
        userService = new UserServiceImpl(
            mockValidator,
            mockRequestFormatter,
            mockHasher,
            mockRepository,
            mockResponseFormatter
        );
    });

    it ("returns a created user when request data is valid and user does not yet exists.", async () => {
        mockRequestFormatter.method("formatRequest").willReturn(formattedUserData);
        mockRepository.method("getUserByUsername").willReturn(null);
        mockRepository.method("getUserByEmail").willReturn(null);
        mockHasher.method("hash").willReturn(formattedUserDataWithHashedPassword.password);
        mockRepository.method("createUser").willReturn(creatededUser);
        mockResponseFormatter.method("formatModel").willReturn(formattedResponseUser);

        await expect (userService.createUser(validUser)).resolves.toEqual(formattedResponseUser);

        mockValidator.callWith(validUser);
        mockRequestFormatter.callWith(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedUserData.username);
        mockRepository.callMethod("getUserByEmail").with(formattedUserData.email);
        mockHasher.callHashMethodWithPassword(formattedUserData.password);
        mockRepository.callMethod("createUser").with(formattedUserDataWithHashedPassword);
        mockResponseFormatter.callWith(creatededUser);
    });

    it ("throws a conflict error when user username already exists.", async () => {
        mockRequestFormatter.method("formatRequest").willReturn(formattedUserData);
        mockRepository.method("getUserByUsername").willReturn(alreadyExistentUser);
        
        await expect (userService.createUser(validUser)).rejects.toThrowError(
            new ConflictError("Username already registered.")
        );

        mockValidator.callWith(validUser);
        mockRequestFormatter.callWith(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedUserData.username);
        mockRepository.doNotCallMethod("getUserByEmail");
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockResponseFormatter.doNotCall();
    });

    it ("throws a conflict error when user email already exists.", async () => {
        mockRequestFormatter.method("formatRequest").willReturn(formattedUserData);
        mockRepository.method("getUserByUsername").willReturn(null);
        mockRepository.method("getUserByEmail").willReturn(alreadyExistentUser);
        
        await expect (userService.createUser(validUser)).rejects.toThrowError(
            new ConflictError("Email already registered.")
        );

        mockValidator.callWith(validUser);
        mockRequestFormatter.callWith(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedUserData.username);
        mockRepository.callMethod("getUserByEmail").with(formattedUserData.email);
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockResponseFormatter.doNotCall();
    });

    it ("throws a bad request error when user data is invalid.", async () => {
        mockValidator.willFail();
        
        await expect (userService.createUser(invalidUser)).rejects.toBeInstanceOf(BadRequestError)

        mockValidator.callWith(invalidUser);
        mockRequestFormatter.doNotCall();
        mockRepository.doNotCallMethod("getUserByUsername");
        mockRepository.doNotCallMethod("getUserByEmail");
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockResponseFormatter.doNotCall();
    });
});