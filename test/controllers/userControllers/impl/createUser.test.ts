import { beforeEach, describe, expect, vi, it } from "vitest";
import type UserCreateRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import MockRequest from "../mocks/MockRequest";
import MockResponse from "../mocks/MockResponse";
import MockUserService from "../mocks/MockUserService";
import UserController from "@controllers/UserController";
import MockServer from "../mocks/MockServer";
import BadRequestError from "@shared/errors/responseError/BadRequestError";
import ConflictError from "@shared/errors/responseError/ConflictError";
import InternalError from "@shared/errors/responseError/InternalError";

const userExample: UserCreateRequestDTO = {
    username: "user_example1",
    firstName: "User",
    lastName: "Example",
    birthDate: "2005-04-19",
    email: "userexample1@gmail.com",
    password: "12345"
};

const invalidMockUser: UserCreateRequestDTO = {
    username: "User Example",
    firstName: "32121",
    lastName: "*$%!",
    birthDate: "19/04/2005",
    email: "userexamplegmail.com",
    password: "1"
};

const returnedUser: UserResponseDTO = {
    id: 1,
    username: "user_example1",
    firstName: "User",
    lastName: "Example",
    birthDate: "19/04/2005",
    email: "userexample1@gmail.com",
    createdAt: "03/08/2025",
    updatedAt: "04/08/2025"
};

let mockRequest: MockRequest;
let mockResponse: MockResponse;
let mockUserService: MockUserService;
let userController: UserController;
let mockServer: MockServer<UserController>;   

const method: keyof UserController = "createUser";

describe (`${method} Controller Method Test`, () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRequest = new MockRequest();
        mockResponse = new MockResponse();
        mockUserService = new MockUserService(mockRequest);
        userController = new UserController(mockUserService);
        mockServer = new MockServer(userController, mockRequest, mockResponse);
    });

    it ("returns user and status 201 when user is successfully created.", async () => {
        mockRequest.bodyDataWillBe(userExample);
        
        mockUserService.method(method).willReturn(returnedUser);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(201);

        mockResponse.callResponseJsonWith({ message: "User created.", data: returnedUser});
    });

    it ("throws a exception and status 400 when user data is invalid.", async () => {
        var badRequestError: BadRequestError = new BadRequestError("Invalid user data.");

        mockRequest.bodyDataWillBe(invalidMockUser);

        mockUserService.method(method).willThrown(badRequestError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(badRequestError.status);

        mockResponse.callResponseJsonWith({ message: expect.any(String) });
    });

    it ("throws a exception and status 409 when user already exists.", async () => {
        var conflictError: ConflictError = new ConflictError("UserCreateRequestDTO already exists.");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.method(method).willThrown(conflictError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentBodyDataWithMethod(method)

        mockResponse.callResponseStatusWith(conflictError.status);

        mockResponse.callResponseJsonWith({ message: conflictError.message });
    });

    it ("throws a exception and status 500 when server internal error occurs.", async () => {
        var internalServerError: InternalError = new InternalError("Internal Server Error.");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.method(method).willThrown(internalServerError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(internalServerError.status);

        mockResponse.callResponseJsonWith({ message: internalServerError.message });
    });
});