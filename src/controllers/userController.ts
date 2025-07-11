import { type Request, type Response } from "express";
import type { UserModel } from "../shared/schemas/UserSchema";
import type UserService from "../services/userServiceImpl";
import { ApplicationError } from "../shared/util/errors/Error";

export default class UserController {
    private readonly userService: UserService;

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
            return this.handleError(res, e);
        }
    }

    public async createUser(req: Request, res: Response): Promise<Response> {
        try {
            const created: UserModel = await this.userService.createUser(req.body);

            return res.status(201).json({ message: "User created.", data: created });
        }

        catch(e: unknown) {
            return this.handleError(res, e);
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const updated: UserModel = await this.userService.updateUser(req.params.id, req.body);

            const hasNotChanged: boolean = updated == null;

            if (hasNotChanged) {
                return res.status(204).send();
            }

            return res.status(200).json({ message: "User updated successfully.", data: updated });
        }

        catch(e: unknown) {
            return this.handleError(res, e);
        }
    }
    
    private handleError(res: Response, e: unknown): Response {
        if (e instanceof ApplicationError) {
            return res.status(e.status).json({ message: e.message });
        }
    
        return res.status(500).json({ message: String(e) });
    }
}