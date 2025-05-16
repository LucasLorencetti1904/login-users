import { type Request, type Response } from "express";
import getErrorMessage from "../shared/util/getErrorMessage";
import type { IUserModel } from "../interfaces/IUserModel";

export default class UserController {
    private userService: UserService;

    constructor(userService: UserService) {
        this.userService = userService;
    }

    public async listUser(req: Request, res: Response): Promise<Response> {
        try {
            const user: IUserModel[] | null = await this.userService.getUser(req.params.id);
            if (!user || user.length < 1) {
                return res.status(404).json({ message: "User not found."});
            }
            return res.status(200).json({ message: user });
        }
        catch(error: unknown) {
            return res.status(500).json({ message: getErrorMessage(error) })
        }
    }
}