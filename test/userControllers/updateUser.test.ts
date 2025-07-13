import { beforeEach, describe, expect, vi, it } from "vitest";
import UserController from "../../src/controllers/userController";
import { User, UserModel } from "../../src/shared/schemas/UserSchema";
import { BadRequestError } from "../../src/shared/util/errors/Error";
import MockUserService from "./MockUserService";
import MockServer from "./MockServer";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";

const mockUser: User = {
    fullName: "User Example",
    username: "user_example",
    email: "userexample@gmail.com",
    password: "12345"
};

const invalidMockUser: User = {
    fullName: "12345",
    username: "User Example",
    email: "userexampleemail.com",
    password: "1"
};

const returnedUser: UserModel = {
    id: 1,
    ...mockUser,
    createdAt: new Date("2025-09-03")
};

const updatedUser: UserModel = {
    ...returnedUser,
    username: "user_example_updated"
};

let mockRequest: MockRequest;
let mockResponse: MockResponse;
let mockUserService: MockUserService;
let userController: UserController;
let mockServer: MockServer;   

const method: keyof UserController = "updateUser";

describe (`${method} Method`, () => {
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

        mockRequest.bodyDataWillBe(mockUser);

        mockUserService.methodWillBeReturns(method, updatedUser);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(200);

        mockResponse.callResponseJsonWith({ message: "User updated successfully.", data: updatedUser });
    });

    it ("returns status 204 when new user data is equal to current data.", async () => {
        mockRequest.paramsIdWillBe("1");

        mockRequest.bodyDataWillBe(mockUser);

        mockUserService.methodWillBeReturns(method, null);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(204);

        mockResponse.callResponseEmpty();
    });

    it ("throws a exception and status 400 when new user data is invalid.", async () => {
        var badRequestError: BadRequestError = new BadRequestError("Invalid user data.");

        mockRequest.paramsIdWillBe("1");

        mockRequest.bodyDataWillBe(invalidMockUser);

        mockUserService.methodWillBeThrows(method, badRequestError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(badRequestError.status);

        mockResponse.callResponseJsonWith({ message: expect.any(String) });
    });

    it ("throws a exception and status 409 when new user data is already exists.", async () => {
        var conflictError: BadRequestError = new BadRequestError("New user data already exists.");

        mockRequest.paramsIdWillBe("1");

        mockRequest.bodyDataWillBe(mockUser);

        mockUserService.methodWillBeThrows(method, conflictError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdAndBodyDataWithMethod(method);

        mockResponse.callResponseStatusWith(conflictError.status);
        
        mockResponse.callResponseJsonWith({ message: conflictError.message });
    });
});