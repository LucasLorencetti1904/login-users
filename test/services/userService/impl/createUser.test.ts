import { beforeEach, describe, expect, it, vi } from "vitest";
import type { CreateUserRequestDTO, CreateUserParsedDTO } from "@DTOs/UserDTO/CreateUserDTO";
import type { UserModelDTO, UserResponseDTO } from "@DTOs/UserDTO/UserOutputDTO";
import UserServiceImpl from "@services/UserServiceImpl";
import MockCreateUserValidator from "../mocks/MockCreateUserValidator";
import MockUpdateUserValidator from "../mocks/MockUpdateUserValidator";
import MockHasher from "../mocks/MockHasher";
import MockRepository from "../mocks/MockRepository";
import ConflictError from "@shared/errors/responseError/ConflictError";
import BadRequestError from "@shared/errors/responseError/BadRequestError";
import MockUserDataFormatter from "../mocks/MockDataFormatter";

const validUser: CreateUserRequestDTO = {
    username: "    user_example123   ",
    firstName: "   USER ",
    lastName: "example     ",
    birthDate: " 2005-04-19  ",
    email: "     userExAmpLE@gmAIl.cOM  ",
    password: " UserExample123!*  "
};

const invalidUser: CreateUserRequestDTO = {
    username: "  user example 123",
    firstName: "    Us er",
    lastName: "Ex3mpl3    ",
    birthDate: "  19/04/2005  ",
    email: "  user example @random.com",
    password: "   12345"
};

const formattedUserData: CreateUserParsedDTO = {
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: new Date("2005-04-19"),
    email: "userexample@gmail.com",
    password: " UserExample123!*  "
};

const formattedUserDataWithHashedPassword: CreateUserParsedDTO = {
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

let mockCreateUserValidator: MockCreateUserValidator;
let mockUpdateUserValidator: MockUpdateUserValidator;
let mockFormatter: MockUserDataFormatter;
let mockHasher: MockHasher;
let mockRepository: MockRepository;
let userService: UserServiceImpl;

const method: keyof UserServiceImpl = "createUser";

describe (`${method} Service Method Test.`, () => {
    beforeEach (() => {
        vi.clearAllMocks();
        mockCreateUserValidator = new MockCreateUserValidator();
        mockUpdateUserValidator = new MockUpdateUserValidator();
        mockFormatter = new MockUserDataFormatter();
        mockHasher = new MockHasher();
        mockRepository = new MockRepository();
        userService = new UserServiceImpl(
            mockCreateUserValidator,
            mockUpdateUserValidator,
            mockFormatter,
            mockHasher,
            mockRepository,
        );
    });

    it ("returns a created user when request data is valid and user does not yet exists.", async () => {
        mockFormatter.method("formatCreateRequest").willReturn(formattedUserData);
        mockRepository.method("getUserByUsername").willReturn(null);
        mockRepository.method("getUserByEmail").willReturn(null);
        mockHasher.method("hash").willReturn(formattedUserDataWithHashedPassword.password);
        mockRepository.method("createUser").willReturn(creatededUser);
        mockFormatter.method("formatResponse").willReturn(formattedResponseUser)
        await expect (userService.createUser(validUser)).resolves.toEqual(formattedResponseUser);

        mockCreateUserValidator.callWith(validUser);
        mockFormatter.callMethod("formatCreateRequest").with(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedUserData.username);
        mockRepository.callMethod("getUserByEmail").with(formattedUserData.email);
        mockHasher.callHashMethodWithPassword(formattedUserData.password);
        mockRepository.callMethod("createUser").with(formattedUserDataWithHashedPassword);
        mockFormatter.callMethod("formatResponse").with(creatededUser);
    });

    it ("throws a conflict error when user username already exists.", async () => {
        mockFormatter.method("formatCreateRequest").willReturn(formattedUserData);
        mockRepository.method("getUserByUsername").willReturn(alreadyExistentUser);
        
        await expect (userService.createUser(validUser)).rejects.toThrowError(
            new ConflictError("Username already registered.")
        );

        mockCreateUserValidator.callWith(validUser);
        mockCreateUserValidator.callWith(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedUserData.username);
        mockRepository.doNotCallMethod("getUserByEmail");
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockFormatter.doNotCallMethod("formatResponse");
    });

    it ("throws a conflict error when user email already exists.", async () => {
        mockFormatter.method("formatCreateRequest").willReturn(formattedUserData);
        mockRepository.method("getUserByUsername").willReturn(null);
        mockRepository.method("getUserByEmail").willReturn(alreadyExistentUser);
        
        await expect (userService.createUser(validUser)).rejects.toThrowError(
            new ConflictError("Email already registered.")
        );

        mockCreateUserValidator.callWith(validUser);
        mockFormatter.callMethod("formatCreateRequest").with(validUser);
        mockRepository.callMethod("getUserByUsername").with(formattedUserData.username);
        mockRepository.callMethod("getUserByEmail").with(formattedUserData.email);
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockFormatter.doNotCallMethod("formatResponse");
    });

    it ("throws a bad request error when user data is invalid.", async () => {
        mockCreateUserValidator.willFail();
        
        await expect (userService.createUser(invalidUser)).rejects.toBeInstanceOf(BadRequestError)

        mockCreateUserValidator.callWith(invalidUser);
        mockFormatter.doNotCallMethod("formatCreateRequest");
        mockRepository.doNotCallMethod("getUserByUsername");
        mockRepository.doNotCallMethod("getUserByEmail");
        mockHasher.doNotCallHashMethod();
        mockRepository.doNotCallMethod("createUser");
        mockFormatter.doNotCallMethod("formatResponse");
    });
});