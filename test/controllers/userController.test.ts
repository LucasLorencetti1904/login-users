import { beforeEach, describe, expect, vi, it } from "vitest";
import UserController from "../../src/controllers/userController";
import { User, UserModel } from "../../src/shared/schemas/UserSchema";
import { Request, Response } from "express";
import { BadRequestError, ConflictError, InternalError, NotFoundError } from "../../src/shared/util/errors/Error";

const mockUser1: User = {
    fullName: "Arnold Soneguade",
    username: "arnoldSoneguade023r",
    email: "arnoldsoneguade@gmail.com",
    password: "arnold12345"
};

const mockUser2: User = {
    fullName: "Flanela Harginton",
    username: "flanelaland329_",
    email: "flanelaharginton@gmail.com",
    password: "fla74Ba"
}

const invalidMockUser: User = {
    fullName: "32121",
    username: "Lets Jango 043",
    email: "jangogmail.com",
    password: "1"
}

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

const updatedUser: UserModel = {
    ...returnedUser,
    username: "theBestArnoldZZs4"
}

const mockUserService: any = {
    getUser: vi.fn(),
    createUser: vi.fn(),
    updateUser: vi.fn()
};

const mockRes = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
    send: vi.fn()
} as unknown as Response;

const mockReq = {
    params: {},
    body: {}
} as unknown as Request<{ id?: string | undefined }>;

let userController: UserController;

describe ("User Controller", () => {
    function paramsIdWillBe(id: string | undefined): void {
        mockReq.params.id = id;
    }

    function bodyDataWillBe(data: User): void {
        mockReq.body = data;
    }

    function callResponseStatusOnceWith(status: number): void {
        expect (mockRes.status).toHaveBeenCalledExactlyOnceWith(status);
    }

    function callResponseEmptyOnce(): void {
        expect (mockRes.send).toHaveBeenCalledExactlyOnceWith();
    }
    
    type ObjectResponseFormat = { message: string, data?: UserModel | UserModel[] };
    function callResponseJsonOnceWith(data: ObjectResponseFormat): void {
        expect (mockRes.json).toHaveBeenCalledExactlyOnceWith(data);
    }

    beforeEach(async () => {
        vi.clearAllMocks();
        userController = new UserController(mockUserService);
    });
    
    describe ("GET Method", () => {
        function getUserServiceWillBeReturns(data: UserModel | UserModel[] | null): void {
            mockUserService.getUser.mockResolvedValue(data);
        }
        
        function getUserServiceWillBeThrows(error: Error): void {

            mockUserService.getUser.mockRejectedValue(error);
        }

        async function initGetController() {
            await userController.getUser(mockReq, mockRes);
        }
        
        function callGetUserServiceOnceWithCurrentParamsId(): void {
            expect (mockUserService.getUser).toHaveBeenCalledExactlyOnceWith(mockReq.params.id);
        }

        it ("returns a found user and status 200 when id is provided.", async () => {
            paramsIdWillBe("1");

            getUserServiceWillBeReturns(returnedUser);

            await initGetController();
            
            callGetUserServiceOnceWithCurrentParamsId();
            
            callResponseStatusOnceWith(200);
            
            callResponseJsonOnceWith({ message: "User found.", data: returnedUser });
        });
        
        it ("returns a array of found users and status 200 when id is not provided.", async () => {
            paramsIdWillBe(undefined);

            getUserServiceWillBeReturns(arrayWithAllUsersReturned);

            await initGetController();
            
            callGetUserServiceOnceWithCurrentParamsId();
    
            callResponseStatusOnceWith(200);
    
            callResponseJsonOnceWith({ message: "Users found.", data: arrayWithAllUsersReturned });
        });
    
        it ("returns status 204 if there are no users when id is provided.", async () => {
            paramsIdWillBe("3");

            getUserServiceWillBeReturns(null);

            await initGetController();

            callGetUserServiceOnceWithCurrentParamsId();

            callResponseStatusOnceWith(204);

            callResponseEmptyOnce();
        })

        it ("returns status 204 if there are no users when id is not provided.", async () => {
            paramsIdWillBe(undefined);

            getUserServiceWillBeReturns(null);

            await initGetController();

            callGetUserServiceOnceWithCurrentParamsId();

            callResponseStatusOnceWith(204);

            callResponseEmptyOnce();
        })
    
        it ("throws a exception and status 404 when user is not found.", async () => {
            var notFoundError: NotFoundError = new NotFoundError("User not found.");

            paramsIdWillBe("999");
            
            getUserServiceWillBeThrows(notFoundError);

            await initGetController();

            callGetUserServiceOnceWithCurrentParamsId();
    
            callResponseStatusOnceWith(notFoundError.status);
    
            callResponseJsonOnceWith({ message: notFoundError.message });
        });

        it ("throws a exception and status 500 when server internal error occurs.", async () => {
            var internalServerError: InternalError = new InternalError("Internal Server Error.");

            paramsIdWillBe("1");

            getUserServiceWillBeThrows(internalServerError);

            await initGetController();

            callGetUserServiceOnceWithCurrentParamsId();

            callResponseStatusOnceWith(internalServerError.status);

            callResponseJsonOnceWith({ message: internalServerError.message });
        })
    });

    describe ("POST Method", () => {
        function createUserServiceReturns(data: UserModel | UserModel[] | null): void {
            mockUserService.createUser.mockResolvedValue(data);
        }

        function createUserServiceThrows(error: Error): void {
            mockUserService.createUser.mockRejectedValue(error);
        }

        async function initPostController(): Promise<void> {
            await userController.createUser(mockReq, mockRes);
        }

        function callCreateUserServiceOnceWithCurrentBodyData(): void {
            expect (mockUserService.createUser).toHaveBeenCalledExactlyOnceWith(mockReq.body);
        }

        it ("returns user and status 201 when user is successfully created.", async () => {
            bodyDataWillBe(mockUser1);
            
            createUserServiceReturns(returnedUser);

            await initPostController();

            callCreateUserServiceOnceWithCurrentBodyData();

            callResponseStatusOnceWith(201);

            callResponseJsonOnceWith({ message: "User created.", data: returnedUser});
        });

        it ("throws a exception and status 400 when user data is invalid.", async () => {
            var badRequestError: BadRequestError = new BadRequestError("Invalid user data.");

            bodyDataWillBe(invalidMockUser);

            createUserServiceThrows(badRequestError);

            await initPostController();

            callCreateUserServiceOnceWithCurrentBodyData();

            callResponseStatusOnceWith(badRequestError.status);

            callResponseJsonOnceWith({ message: expect.any(String) });
        });

        it ("throws a exception and status 409 when user already exists.", async () => {
            var conflictError: ConflictError = new ConflictError("User already exists.");

            bodyDataWillBe(mockUser1);

            createUserServiceThrows(conflictError);

            await initPostController();

            callCreateUserServiceOnceWithCurrentBodyData()

            callResponseStatusOnceWith(conflictError.status);

            callResponseJsonOnceWith({ message: conflictError.message });
        });
    });
    
    describe ("PUT Method", () => {
        function updateUserServiceReturns(data: UserModel | UserModel[] | null) {
            mockUserService.updateUser.mockResolvedValue(data);
        }

        function updateUserServiceThrows(error: Error) {
            mockUserService.updateUser.mockRejectedValue(error);
        }

        async function initPutController(): Promise<void> {
            await userController.updateUser(mockReq, mockRes);
        }

        function callUpdateUserServiceOnceWithCurrentParamsIdAndBodyData(): void {
            expect (mockUserService.updateUser).toHaveBeenCalledExactlyOnceWith(
                mockReq.params.id, mockReq.body
            );
        }

        it ("returns user and status 200 when user updated successfully.", async () => {
            paramsIdWillBe("1");

            bodyDataWillBe(mockUser1);

            updateUserServiceReturns(updatedUser);

            await initPutController();

            callUpdateUserServiceOnceWithCurrentParamsIdAndBodyData();

            callResponseStatusOnceWith(200);

            callResponseJsonOnceWith({ message: "User updated successfully.", data: updatedUser });
        });

        it ("returns status 204 when new user data is equal to current data.", async () => {
            paramsIdWillBe("1");

            bodyDataWillBe(mockUser1);

            updateUserServiceReturns(null);

            await initPutController();

            callUpdateUserServiceOnceWithCurrentParamsIdAndBodyData();

            callResponseStatusOnceWith(204);

            callResponseEmptyOnce();
        });

        it ("throws a exception and status 400 when new user data is invalid.", async () => {
            var badRequestError: BadRequestError = new BadRequestError("Invalid user data.");

            paramsIdWillBe("1");

            bodyDataWillBe(invalidMockUser);

            updateUserServiceThrows(badRequestError);

            await initPutController();

            callUpdateUserServiceOnceWithCurrentParamsIdAndBodyData();

            callResponseStatusOnceWith(badRequestError.status);

            callResponseJsonOnceWith({ message: expect.any(String) });
        });

        it ("throws a exception and status 409 when new user data is already exists.", async () => {
            var conflictError: BadRequestError = new BadRequestError("New user data already exists.");

            paramsIdWillBe("1");

            bodyDataWillBe(mockUser1);

            updateUserServiceThrows(conflictError);

            await initPutController();

            callUpdateUserServiceOnceWithCurrentParamsIdAndBodyData();

            callResponseStatusOnceWith(conflictError.status);
            
            callResponseJsonOnceWith({ message: conflictError.message });
        });
    });
});