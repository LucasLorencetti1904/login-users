import { beforeEach, describe, vi, it } from "vitest";
import UserController from "../../src/controllers/userController";
import { User, UserModel } from "../../src/shared/schemas/UserSchema";
import { InternalError, NotFoundError } from "../../src/shared/util/errors/Error";
import MockUserService from "./MockUserService";
import MockServer from "./MockServer";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";

const mockUser1: User = {
    fullName: "User Example 1",
    username: "user_example1",
    email: "userexample1@gmail.com",
    password: "12345"
};

const mockUser2: User = {
    fullName: "User Example 2",
    username: "user_example2",
    email: "userexample2@gmail.com",
    password: "54321"
};

const returnedUser: UserModel = {
    id: 1,
    ...mockUser1,
    createdAt: new Date("2025-09-03")
};

const otherReturnedUser: UserModel = {
    id: 2,
    ...mockUser2,
    createdAt: new Date("2023-02-19")
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

    it ("returns status 204 if there are no users when id is provided.", async () => {
        mockRequest.paramsIdWillBe("3");

        mockUserService.methodWillBeReturns(method, null);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(204);

        mockResponse.callResponseEmpty();
    })

    it ("returns status 204 if there are no users when id is not provided.", async () => {
        mockRequest.paramsIdWillBe(undefined);

        mockUserService.methodWillBeReturns(method, null);

        await mockServer.initUserControllerMethod(method);

        mockUserService.callCurrentParamsIdWithMethod(method);

        mockResponse.callResponseStatusWith(204);

        mockResponse.callResponseEmpty();
    })

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
    })
});