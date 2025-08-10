import { beforeEach, describe, vi, it } from "vitest";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import MockRequest from "../mocks/MockRequest";
import MockResponse from "../mocks/MockResponse";
import MockUserService from "../mocks/MockUserService";
import UserController from "@controllers/UserController";
import MockServer from "../mocks/MockServer";
import NotFoundError from "@shared/errors/responseError/NotFoundError";
import InternalError from "@shared/errors/responseError/InternalError";

const returnedUser: UserResponseDTO = {
    id: 1,
    username: "user_example1",
    firstName: "Example",
    lastName: "One",
    birthDate: "19/04/2005",
    email: "userexample1@gmail.com",
    createdAt: "03/08/2025",
    updatedAt: "04/08/2025"
}

const otherReturnedUser: UserResponseDTO = {
    id: 2,
    username: "user_example2",
    firstName: "Example",
    lastName: "Two",
    birthDate: "28/02/2008",
    email: "userexample2@gmail.com",
    createdAt: "04/08/2025",
    updatedAt: "05/08/2025"
};

const arrayWithAllUsersReturned: UserResponseDTO[] = [
    returnedUser,
    otherReturnedUser
];

let mockRequest: MockRequest;
let mockResponse: MockResponse;
let mockUserService: MockUserService;
let userController: UserController;
let mockServer: MockServer<UserController>;

const method: keyof UserController = "getUser";

describe (`${method} Controller Method Test`, () => {
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