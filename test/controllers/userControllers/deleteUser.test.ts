import { beforeEach, describe, vi, it } from "vitest";
import UserController from "@controllers/UserControllerImpl";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import MockServer from "./MockServer";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";
import MockUserService from "./MockUserService";
import { InternalError, NotFoundError } from "@shared/errors/responseError/ResponseError";

const deletedUser: UserResponseDTO = {
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
let mockServer: MockServer;   

const method: keyof UserController = "deleteUser";

describe (`${method} Controller Method Test`, () => {
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

        mockUserService.method(method).willReturn(deletedUser);

        await mockServer.initUserControllerMethod(method);
        
        mockUserService.callCurrentParamsIdWithMethod(method);
        
        mockResponse.callResponseStatusWith(200);
        
        mockResponse.callResponseJsonWith({ message: "User deleted.", data: deletedUser });
    });
    
    it ("throws a exception and status 404 when user is not found.", async () => {
        var notFoundError: NotFoundError = new NotFoundError("User not found.");

        mockRequest.paramsIdWillBe("999");

        mockUserService.method(method).willThrown(notFoundError);

        await mockServer.initUserControllerMethod(method);
        
        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(notFoundError.status);

        mockResponse.callResponseJsonWith({ message: notFoundError.message });
    });

    it ("throws a exception and status 500 when server internal error occurs.", async () => {
        var internalServerError: InternalError = new InternalError("Internal Server Error.");

        mockRequest.paramsIdWillBe("1");

        mockUserService.method(method).willThrown(internalServerError);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(internalServerError.status);

        mockResponse.callResponseJsonWith({ message: internalServerError.message });
    });
});