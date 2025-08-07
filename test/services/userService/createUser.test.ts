import { beforeEach, describe, expect, it, vi } from "vitest";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
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

const validUser: UserRequestDTO = {
    username: "    user_example123   ",
    firstName: "   USER ",
    lastName: "example     ",
    birthDate: " 2005-04-19  ",
    email: "     userExAmpLE@gmAIl.cOM  ",
    password: " UserExample123!*  "
};

const invalidUser: UserRequestDTO = {
    username: "  user example 123",
    firstName: "    Us er",
    lastName: "Ex3mpl3    ",
    birthDate: "  19/04/2005  ",
    email: "  user example @random.com",
    password: "   12345"
};

const formattedRequestUser: UserFormattedDataDTO = {
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: new Date("2005-04-19"),
    email: "userexample@gmail.com",
    password: " UserExample123!*  "
};

const alreadyExistentUser: UserModelDTO = {
    id: 1,
    ...formattedRequestUser,
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
        mockRequestFormatter.method("formatRequest").willReturn(formattedRequestUser);
        mockRepository.method("getUserByUsername").willReturn(null);
        mockRepository.method("getUserByEmail").willReturn(null);
        mockHasher.method("hash").willReturn("$2b$10$hwex3g34xz9vplX0BdBvBevG0MzVJjYeJZV3pqv7uSYBHZ5ozH1Am");
        mockRepository.method("createUser").willReturn(creatededUser);
        mockResponseFormatter.method("formatModel").willReturn(formattedResponseUser);
        
        await expect (userService.createUser(validUser)).resolves.not.toBeInstanceOf(Error);
        await expect (userService.createUser(validUser)).resolves.toEqual(formattedResponseUser);

        mockValidator.callWith(validUser);
        mockRequestFormatter.callWith(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedRequestUser.username);
        mockRepository.callMethod("getUserByEmail").with(formattedRequestUser.email);
        mockHasher.callHashMethodWithPassword(formattedRequestUser.password);
        mockRepository.callMethod("createUser").withId(formattedRequestUser);
        mockResponseFormatter.callWith(creatededUser);
    });

    it ("throws a conflict error when user username already exists.", async () => {
        mockRequestFormatter.method("formatRequest").willReturn(formattedRequestUser);
        mockRepository.method("getUserByUsername").willReturn(alreadyExistentUser);
        
        await expect (userService.createUser(validUser)).rejects.toBeInstanceOf(ConflictError);
        await expect (userService.createUser(validUser)).rejects.toThrow("Username already registered.");

        mockValidator.callWith(validUser);
        mockRequestFormatter.callWith(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedRequestUser.username);
        mockRepository.doNotCallMethod("getUserByEmail");
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockResponseFormatter.doNotCall();
    });

    it ("throws a conflict error when user email already exists.", async () => {
        mockRequestFormatter.method("formatRequest").willReturn(formattedRequestUser);
        mockRepository.method("getUserByUsername").willReturn(null);
        mockRepository.method("getUserByEmail").willReturn(alreadyExistentUser);
        
        await expect (userService.createUser(validUser)).rejects.toBeInstanceOf(ConflictError);
        await expect (userService.createUser(validUser)).rejects.toThrow("Email already registered.");

        mockValidator.callWith(validUser);
        mockRequestFormatter.callWith(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedRequestUser.username);
        mockRepository.callMethod("getUserByEmail").with(formattedRequestUser.email);
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockResponseFormatter.doNotCall();
    });

    it ("throws a bad request error when user data is invalid.", async () => {
        mockValidator.willFail();
        
        await expect (userService.createUser(invalidUser)).rejects.toBeInstanceOf(BadRequestError);
        await expect (userService.createUser(invalidUser)).rejects.toThrow(expect.toString());

        mockValidator.callWith(invalidUser);
        mockRequestFormatter.doNotCall();
        mockRepository.doNotCallMethod("getUserByUsername");
        mockRepository.doNotCallMethod("getUserByEmail");
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockResponseFormatter.doNotCall();
    });
});