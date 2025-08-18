import { beforeEach, describe, expect, vi, it } from "vitest";
import type { UpdateUserRequestDTO } from "@DTOs/UserDTO/UpdateUserDTO";
import type { UserResponseDTO } from "@DTOs/UserDTO/UserOutputDTO";
import MockRequest from "../mocks/MockRequest";
import MockResponse from "../mocks/MockResponse";
import MockUserService from "../mocks/MockUserService";
import UserController from "@controllers/UserController";
import MockServer from "../mocks/MockServer";
import BadRequestError from "@shared/errors/responseError/BadRequestError";
import NotFoundError from "@shared/errors/responseError/NotFoundError";
import ConflictError from "@shared/errors/responseError/ConflictError";
import InternalError from "@shared/errors/responseError/InternalError";


const userExample: UpdateUserRequestDTO = {
    username: "user_example_updated",
    firstName: "Updated"
};

const updatedUser: UserResponseDTO = {
    id: 1,
    ...(userExample as Required<typeof userExample>),
    lastName: "Example",
    birthDate: "2025-04-19",
    email: "userexample1@gmail.com",
    createdAt: "03/08/2025",
    updatedAt: "04/08/2025"
};

const invalidUserExample: UpdateUserRequestDTO = {
    username: "User Example",
    firstName: "32121",
    lastName: "*$%!",
    birthDate: "19/04/2025",
    email: "userexamplegmail.com",
    password: "1"
};

let mockRequest: MockRequest;
let mockResponse: MockResponse;
let mockUserService: MockUserService;
let userController: UserController;
let mockServer: MockServer<UserController>;

const method: keyof UserController = "updateUser";

describe (`${method} Controller Method Test`, () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRequest = new MockRequest();
        mockResponse = new MockResponse();
        mockUserService = new MockUserService(mockRequest);
        userController = new UserController(mockUserService);
        mockServer = new MockServer(userController, mockRequest, mockResponse);
    });

    it ("returns user and status 200 when user updated successfully.", async () => {
        mockRequest.paramsIdWillBe("1");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.method(method).willReturn(updatedUser);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(200);

        mockResponse.callResponseJsonWith({ message: "User updated.", data: updatedUser });
    });

    it ("returns status 204 when new user data is equal to current data.", async () => {
        mockRequest.paramsIdWillBe("1");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.method(method).willReturn(null);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(204);

        mockResponse.callResponseEmpty();
    });

    it ("throws a exception and status 400 when new user data is invalid.", async () => {
        var badRequestError: BadRequestError = new BadRequestError("Invalid user data.");

        mockRequest.paramsIdWillBe("1");

        mockRequest.bodyDataWillBe(invalidUserExample);

        mockUserService.method(method).willThrown(badRequestError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(badRequestError.status);

        mockResponse.callResponseJsonWith({ message: expect.any(String) });
    });

    it ("throws a exception and status 404 when user not found.", async () => {
        var notFoundError: NotFoundError = new NotFoundError("User not found.");

        mockRequest.paramsIdWillBe("999");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.method(method).willThrown(notFoundError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(notFoundError.status);

        mockResponse.callResponseJsonWith({ message: notFoundError.message });
    });

    it ("throws a exception and status 409 when new user data is already exists.", async () => {
        var conflictError: ConflictError = new ConflictError("New user data already exists.");

        mockRequest.paramsIdWillBe("1");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.method(method).willThrown(conflictError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(conflictError.status);
        
        mockResponse.callResponseJsonWith({ message: conflictError.message });
    });

    it ("throws a exception and status 500 when server internal error occurs.", async () => {
        var internalServerError: InternalError = new InternalError("Internal Server Error.");

        mockRequest.paramsIdWillBe("1");

        mockRequest.bodyDataWillBe(userExample);

        mockUserService.method(method).willThrown(internalServerError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(internalServerError.status);

        mockResponse.callResponseJsonWith({ message: internalServerError.message });
    });
});