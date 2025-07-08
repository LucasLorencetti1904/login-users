import { beforeEach, describe, expect, vi, it } from "vitest";
import UserController from "../../src/controllers/userController";
import { User, UserModel } from "../../src/shared/schemas/UserSchema";
import { Request, Response } from "express";

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
    json: vi.fn()
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
        function paramsIdWillBe(id: string | undefined = undefined) {
            mockReq.params.id = id;
        }

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

        function callGetUserServiceOnceWithParamsId(): void {
            expect (mockUserService.getUser).toHaveBeenCalledExactlyOnceWith(mockReq.params.id);
        }

        function callGetUserServiceOnceWithoutParams(): void {
            expect (mockUserService.getUser).toHaveBeenCalledExactlyOnceWith(undefined);
        }

        function callResponseStatusOnceWith(status: number): void {
            expect (mockRes.status).toHaveBeenCalledExactlyOnceWith(status);
        }

        type ObjectResponseFormat = { message: string, data?: UserModel | UserModel[] }
        function callResponseJsonOnceWith(data: ObjectResponseFormat): void {
            expect (mockRes.json).toHaveBeenCalledExactlyOnceWith(data);
        }


        it ("returns all users and status 200 when id is not provided", async () => {
            paramsIdWillBe(undefined);

            await initMockedServerWithGetUserServiceReturning(arrayWithAllUsersReturned);
            
            callGetUserServiceOnceWithoutParams();
    
            callResponseStatusOnceWith(200);
    
            callResponseJsonOnceWith({ message: "Users found.", data: arrayWithAllUsersReturned });
        });
    
        it ("returns a user and status 200 when id is provided", async () => {
            paramsIdWillBe("1");
    
            await initMockedServerWithGetUserServiceReturning(returnedUser);

            callGetUserServiceOnceWithParamsId();

            callResponseStatusOnceWith(200);
    
            callResponseJsonOnceWith({ message: "User found.", data: returnedUser });
        });
    
        it ("returns a message when user is not found", async () => {
            paramsIdWillBe("999")

            await initMockedServerWithGetUserServiceReturning(null);

            callGetUserServiceOnceWithParamsId();
    
            callResponseStatusOnceWith(404);
    
            callResponseJsonOnceWith({ message: "User not found." });
        });
    });
});