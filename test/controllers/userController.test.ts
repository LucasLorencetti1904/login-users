import { beforeEach, describe, expect, vi, it } from "vitest";
import UserController from "../../src/controllers/userController";
import { User, UserModel } from "../../src/shared/schemas/UserSchema";
import { Request, Response } from "express";
import { InternalError, NotFoundError } from "../../src/shared/util/errors/Error";

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

const mockUserService: any = {
    getUser: vi.fn() 
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
    beforeEach(async () => {
        vi.clearAllMocks();
        userController = new UserController(mockUserService);
    });
    
    describe ("GET Method", () => {
        async function initMockedServerWithGetUserServiceReturning(data: UserModel | UserModel[] | null): Promise<void> {
            getUserServiceReturns(data)
            await initMockedService();
        }
        
        async function initMockedServerWithGetUserServiceThrowing(error: Error): Promise<void> {
            getUserServiceThrows(error);
            await initMockedService();
        }

        function getUserServiceReturns(data: UserModel | UserModel[] | null): void {
            mockUserService.getUser.mockResolvedValue(data);
        }
        
        function getUserServiceThrows(error: Error): void {
            mockUserService.getUser.mockRejectedValue(error);
        }
        
        async function initMockedService(): Promise<void> {
            await userController.getUser(mockReq, mockRes);
        }
        
        function paramsIdWillBe(id: string | undefined): void {
            mockReq.params.id = id;
        }

        function callGetUserServiceOnceWithCurrentParamsId(): void {
            expect (mockUserService.getUser).toHaveBeenCalledExactlyOnceWith(mockReq.params.id);
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

        it ("returns a found user and status 200 when id is provided", async () => {
            paramsIdWillBe("1");

            await initMockedServerWithGetUserServiceReturning(returnedUser);
            
            callGetUserServiceOnceWithCurrentParamsId();
            
            callResponseStatusOnceWith(200);
            
            callResponseJsonOnceWith({ message: "User found.", data: returnedUser });
        });
        
        it ("returns a array of found users and status 200 when id is not provided", async () => {
            paramsIdWillBe(undefined);

            await initMockedServerWithGetUserServiceReturning(arrayWithAllUsersReturned);
            
            callGetUserServiceOnceWithCurrentParamsId();
    
            callResponseStatusOnceWith(200);
    
            callResponseJsonOnceWith({ message: "Users found.", data: arrayWithAllUsersReturned });
        });
    
        it ("returns status 204 if there are no users when id is provided.", async () => {
            paramsIdWillBe("3");

            await initMockedServerWithGetUserServiceReturning(null);

            callGetUserServiceOnceWithCurrentParamsId();

            callResponseStatusOnceWith(204);

            callResponseEmptyOnce();
        })

        it ("returns status 204 if there are no users when id is not provided.", async () => {
            paramsIdWillBe(undefined);

            await initMockedServerWithGetUserServiceReturning(null);

            callGetUserServiceOnceWithCurrentParamsId();

            callResponseStatusOnceWith(204);

            callResponseEmptyOnce();
        })
    
        it ("throws a exception and status 404 when user is not found", async () => {
            var notFoundError: NotFoundError = new NotFoundError("User not found.");

            paramsIdWillBe("999");
            
            await initMockedServerWithGetUserServiceThrowing(notFoundError);

            callGetUserServiceOnceWithCurrentParamsId();
    
            callResponseStatusOnceWith(notFoundError.status);
    
            callResponseJsonOnceWith({ message: notFoundError.message});
        });

        it ("throws a exception and status 500 when server internal error occurs.", async () => {
            var internalServerError: InternalError = new InternalError("Internal Server Error.");

            paramsIdWillBe("1");

            await initMockedServerWithGetUserServiceThrowing(internalServerError);

            callGetUserServiceOnceWithCurrentParamsId();

            callResponseStatusOnceWith(internalServerError.status);

            callResponseJsonOnceWith({ message: internalServerError.message });
        })
    });
});