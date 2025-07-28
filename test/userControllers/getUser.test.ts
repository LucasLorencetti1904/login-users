import { beforeEach, describe, vi, it } from "vitest";
import UserController from "@controllers/userController";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import MockServer from "./MockServer";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";
import MockUserService from "./MockUserService";
import { InternalError, NotFoundError } from "@shared/errors/ResponseError";

const returnedUser: UserResponseDTO = {
    username: "user_example1",
    firstName: "Example",
    lastName: "One",
    birthDate: "2005-04-19",
    email: "userexample1@gmail.com",
}

const otherReturnedUser: UserResponseDTO = {
    username: "user_example2",
    firstName: "Example",
    lastName: "Two",
    birthDate: "2008-02-28",
    email: "userexample2@gmail.com",
};

const arrayWithAllUsersReturned: UserResponseDTO[] = [
    returnedUser,
    otherReturnedUser
];

let mockRequest: MockRequest;
let mockResponse: MockResponse;
let mockUserService: MockUserService;
let userController: UserController;
let mockServer: MockServer;

const method: keyof UserController = "getUser";

describe (`${method} Method`, () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRequest = new MockRequest();
        mockResponse = new MockResponse();
        mockUserService = new MockUserService(mockRequest);
        userController = new UserController(mockUserService);
        mockServer = new MockServer(userController, mockRequest, mockResponse);
    });

    it ("returns a found user and status 200 when id is provided.", async () => {
        mockRequest.paramsIdWillBe("1");

        mockUserService.method(method).willReturn(returnedUser);

        await mockServer.initUserControllerMethod(method);
        
        mockUserService.callCurrentParamsIdWithMethod(method);
        
        mockResponse.callResponseStatusWith(200);
        
        mockResponse.callResponseJsonWith({ message: "User found.", data: returnedUser });
    });
    
    it ("returns a array of found users and status 200 when id is not provided.", async () => {
        mockRequest.paramsIdWillBe(undefined);

        mockUserService.method(method).willReturn(arrayWithAllUsersReturned);

        await mockServer.initUserControllerMethod(method);
        
        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(200);

        mockResponse.callResponseJsonWith({ message: "Users found.", data: arrayWithAllUsersReturned });
    });

    it ("returns status 204 if there are no users.", async () => {
        mockRequest.paramsIdWillBe(undefined);

        mockUserService.method(method).willReturn(null);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(204);

        mockResponse.callResponseEmpty();
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