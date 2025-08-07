import { type Request, type Response } from "express";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import ResponseError from "@shared/errors/responseError/ResponseError";

export default class UserController {
    private readonly userService: any;

    public constructor(userService: any) {
        this.userService = userService;
    }

    public async getUser(req: Request, res: Response): Promise<Response> {
        try {
            const founded: UserResponseDTO = await this.userService.getUser(Number(req.params.id));

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
            const created: UserResponseDTO = await this.userService.createUser(req.body);

            return res.status(201).json({ message: "User created.", data: created });
        }

        catch(e: unknown) {
            return this.handleError(res, e);
        }
    }

    public async updateUser(req: Request, res: Response): Promise<Response> {
        try {
            const updated: UserResponseDTO = await this.userService.updateUser(
                Number(req.params.id), req.body
            );

            const hasNotChanged: boolean = updated == null;

            if (hasNotChanged) {
                return res.status(204).send();
            }

            return res.status(200).json({ message: "User updated.", data: updated });
        }

        catch(e: unknown) {
            return this.handleError(res, e);
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        try {
            const deleted: UserResponseDTO = await this.userService.deleteUser(Number(req.params.id));

            return res.status(200).json({ message: "User deleted.", data: deleted });
        }

        catch(e: unknown) {
            return this.handleError(res, e);
        }
    }
    
    private handleError(res: Response, e: unknown): Response {
        if (e instanceof ResponseError) {
            return res.status((e as ResponseError).status).
                json({ message: (e as ResponseError).message });
        }
    
        return res.status(500).json({ message: String(e) });
    }
}