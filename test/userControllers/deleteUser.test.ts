import { beforeEach, describe, vi, it } from "vitest";
import UserController from "../../src/controllers/userController";
import { UserModel } from "../../src/models/User";
import MockUserService from "./MockUserService";
import MockServer from "./MockServer";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";
import { InternalError, NotFoundError } from "../../src/shared/util/errors/ResponseError";

const deletedUser: UserModel = {
    id: 1,
    username: "user_example1",
    firstName: "User",
    lastName: "Example",
    email: "userexample1@gmail.com",
    password: "12345",
    createdAt: new Date("2025-09-03"),
    updatedAt: new Date("2025-09-05")
};

let mockRequest: MockRequest;
let mockResponse: MockResponse;
let mockUserService: MockUserService;
let userController: UserController;
let mockServer: MockServer;   

const method: keyof UserController = "deleteUser";

describe (`${method} Method`, () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRequest = new MockRequest();
        mockResponse = new MockResponse();
        mockUserService = new MockUserService(mockRequest);
        userController = new UserController(mockUserService);
        mockServer = new MockServer(userController, mockRequest, mockResponse);
    });

    it ("returns a user and status 200 when user is deleted successfully.", async () => {
        mockRequest.paramsIdWillBe("1");

        mockUserService.methodWillBeReturns(method, deletedUser);

        await mockServer.initUserControllerMethod(method);
        
        mockUserService.callCurrentParamsIdWithMethod(method);
        
        mockResponse.callResponseStatusWith(200);
        
        mockResponse.callResponseJsonWith({ message: "User deleted.", data: deletedUser });
    });
    
    it ("throws a exception and status 404 when user is not found.", async () => {
        var notFoundError: NotFoundError = new NotFoundError("User not found.");

        mockRequest.paramsIdWillBe("999");

        mockUserService.methodWillBeThrows(method, notFoundError);

        await mockServer.initUserControllerMethod(method);
        
        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(notFoundError.status);

        mockResponse.callResponseJsonWith({ message: notFoundError.message });
    });

    it ("throws a exception and status 500 when server internal error occurs.", async () => {
        var internalServerError: InternalError = new InternalError("Internal Server Error.");

        mockRequest.paramsIdWillBe("1");

        mockUserService.methodWillBeThrows(method, internalServerError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(internalServerError.status);

        mockResponse.callResponseJsonWith({ message: internalServerError.message });
    });
});