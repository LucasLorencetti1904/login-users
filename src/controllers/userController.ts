import { type Request, type Response } from "express";
import type { UserModel } from "../shared/schemas/UserSchema";
import type UserService from "../services/userServiceImpl";

export default class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    async getUser(req: Request, res: Response): Promise<void> {
        const usersFound: UserModel = await this.userService.getUser(req.params.id);
        if (!usersFound) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        if (Array.isArray(usersFound)) {
            res.status(200).json({ message: "Users found.", data: usersFound });
            return;
        }
        res.status(200).json({ message: "User found.", data: usersFound });
    }
}