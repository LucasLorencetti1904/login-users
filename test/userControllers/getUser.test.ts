import { User, UserModel } from "../../src/models/User";
import { beforeEach, describe, vi, it } from "vitest";
import UserController from "../../src/controllers/userController";
import MockUserService from "./MockUserService";
import MockServer from "./MockServer";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";
import { InternalError, NotFoundError } from "../../src/shared/util/errors/ResponseError";

const userExample1: User = {
    username: "user_example1",
    firstName: "Example",
    lastName: "One",
    email: "userexample1@gmail.com",
    password: "12345"
};

const userExample2: User = {
    username: "user_example2",
    firstName: "Example",
    lastName: "Two",
    email: "userexample2@gmail.com",
    password: "54321"
};

const returnedUser: UserModel = {
    id: 1,
    ...userExample1,
    createdAt: new Date("2025-09-03"),
    updatedAt: new Date("2025-09-04")
};

const otherReturnedUser: UserModel = {
    id: 2,
    ...userExample2,
    createdAt: new Date("2023-02-19"),
    updatedAt: new Date("2023-02-21")
};

const arrayWithAllUsersReturned: UserModel[] = [
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

        mockUserService.methodWillBeReturns(method, returnedUser);

        await mockServer.initUserControllerMethod(method);
        
        mockUserService.callCurrentParamsIdWithMethod(method);
        
        mockResponse.callResponseStatusWith(200);
        
        mockResponse.callResponseJsonWith({ message: "User found.", data: returnedUser });
    });
    
    it ("returns a array of found users and status 200 when id is not provided.", async () => {
        mockRequest.paramsIdWillBe(undefined);

        mockUserService.methodWillBeReturns(method, arrayWithAllUsersReturned);

        await mockServer.initUserControllerMethod(method);
        
        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(200);

        mockResponse.callResponseJsonWith({ message: "Users found.", data: arrayWithAllUsersReturned });
    });

    it ("returns status 204 if there are no users.", async () => {
        mockRequest.paramsIdWillBe(undefined);

        mockUserService.methodWillBeReturns(method, null);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(204);

        mockResponse.callResponseEmpty();
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