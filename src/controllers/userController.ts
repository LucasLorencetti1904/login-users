import { type Request, type Response } from "express";
import getErrorMessage from "../shared/util/getErrorMessage";
import type { UserModel } from "../domain/schemas/UserSchema";
import type UserService from "../services/userService";

export default class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async listUser(req: Request, res: Response): Promise<Response> {
        try {
            const user: UserModel[] | UserModel | null = await this.userService.getUser(Number(req.params.id));
            if (!user || (Array.isArray(user) && user.length < 1)) {
                return res.status(404).json({ message: "User not found."});
            }
            return res.status(200).json({ message: user });
        }
        catch(error: unknown) {
            return res.status(500).json({ message: getErrorMessage(error) })
        }
    }
}