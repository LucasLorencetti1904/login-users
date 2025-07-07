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

const mockUserModel1: UserModel = {
    id: 1,
    ...mockUser1,
    createdAt: new Date("2025-09-03")
};

const mockUserModel2: UserModel = {
    id: 2,
    ...mockUser2,
    createdAt: new Date("2023-02-19")
};

const allMockUserModels: UserModel[] = [
    mockUserModel1,
    mockUserModel2
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
    body: {
        user: {
            fullName: "Arnold Soneguade",
            username: "arnoldSoneguade023r",
            email: "arnoldsoneguade@gmail.com",
            password: "arnold12345"
        }
    }
} as unknown as Request;

let userController: UserController;

describe ('getUser method', () => {
    beforeEach(async () => {
        userController = new UserController(mockUserService);
    })

    it ("return all users and status 200 when id is not passed", async () => {
        mockUserService.getUser.mockResolvedValue(allMockUserModels);
        
        await userController.getUser(mockReq, mockRes);
        
        expect (mockUserService.getUser).toHaveBeenCalledWith(mockReq.params.id);

        expect (mockRes.status).toHaveBeenCalledWith(200);

        expect (mockRes.json).toHaveBeenCalledWith({ message: "Users found.", data: allMockUserModels });
    })

    it ("return a user and status 200 when id is passed", async () => {
        mockReq.params.id = "1";

        mockUserService.getUser.mockResolvedValue(mockUserModel1);

        await userController.getUser(mockReq, mockRes);

        expect (mockUserService.getUser).toHaveBeenCalledWith(mockReq.params.id);

        expect (mockRes.status).toHaveBeenCalledWith(200);

        expect (mockRes.json).toHaveBeenCalledWith({ message: "User found.", data: mockUserModel1});
    })

    it ("return a message when user is not found", async () => {
        mockUserService.getUser.mockResolvedValue(null);
        
        await userController.getUser(mockReq, mockRes);
        
        expect (mockUserService.getUser).toHaveBeenCalledWith(mockReq.params.id);

        expect (mockRes.status).toHaveBeenCalledWith(404);

        expect (mockRes.json).toHaveBeenCalledWith({ message: "User not found." });
    });
});