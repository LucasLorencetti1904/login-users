import { type Request, type Response } from "express";
import type { UserModel } from "../shared/schemas/UserSchema";
import type UserService from "../services/userServiceImpl";
import { ApplicationError } from "../shared/util/errors/Error";

export default class UserController {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const founded: UserModel = await this.userService.getUser(req.params.id);

            const noUsers: boolean = !founded;

            if (noUsers) {
                return res.status(204).send();
            }

            return res.status(200).json({
                message: `User${Array.isArray(founded) ? "s" : ""} found.`,
                data: founded
            });
        }

        catch(e: unknown) {
            if (e instanceof ApplicationError) {
                return res.status(e.status).json({ message: e.message });
            }

            return res.status(500).json({ message: String(e) });
        }
    }
}