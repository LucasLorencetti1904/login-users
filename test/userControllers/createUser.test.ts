import { User, UserModel } from "../../src/models/User";
import { beforeEach, describe, expect, vi, it } from "vitest";
import UserController from "../../src/controllers/userController";
import MockUserService from "./MockUserService";
import MockServer from "./MockServer";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";
import { BadRequestError, ConflictError, InternalError } from "../../src/shared/util/errors/ResponseError";

const userExample: User = {
    username: "user_example1",
    firstName: "User",
    lastName: "Example",
    email: "userexample1@gmail.com",
    password: "12345"
};

const invalidMockUser: User = {
    username: "User Example",
    firstName: "32121",
    lastName: "*$%!",
    email: "userexamplegmail.com",
    password: "1"
};

const returnedUser: UserModel = {
    id: 1,
    ...userExample,
    createdAt: new Date("2025-09-03"),
    updatedAt: new Date("2025-09-05")
};

let mockRequest: MockRequest;
let mockResponse: MockResponse;
let mockUserService: MockUserService;
let userController: UserController;
let mockServer: MockServer;   

const method: keyof UserController = "createUser";

describe (`${method} Method`, () => {
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
        
        mockUserService.methodWillBeReturns(method, returnedUser);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(201);

        mockResponse.callResponseJsonWith({ message: "User created.", data: returnedUser});
    });

    it ("throws a exception and status 400 when user data is invalid.", async () => {
        var badRequestError: BadRequestError = new BadRequestError("Invalid user data.");

        mockRequest.bodyDataWillBe(invalidMockUser);

        mockUserService.methodWillBeThrows(method, badRequestError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(badRequestError.status);

        mockResponse.callResponseJsonWith({ message: expect.any(String) });
    });

    it ("throws a exception and status 409 when user already exists.", async () => {
        var conflictError: ConflictError = new ConflictError("User already exists.");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.methodWillBeThrows(method, conflictError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentBodyDataWithMethod(method)

        mockResponse.callResponseStatusWith(conflictError.status);

        mockResponse.callResponseJsonWith({ message: conflictError.message });
    });

    it ("throws a exception and status 500 when server internal error occurs.", async () => {
        var internalServerError: InternalError = new InternalError("Internal Server Error.");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.methodWillBeThrows(method, internalServerError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(internalServerError.status);

        mockResponse.callResponseJsonWith({ message: internalServerError.message });
    });
});