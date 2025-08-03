import { Request, Response } from "express";
import UserController from "@controllers/UserController";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";

export default class MockServer {
    public constructor(
        private readonly controller: UserController,
        private readonly req: MockRequest,
        private readonly res: MockResponse
    ) {}

    public async initUserControllerMethod(method: keyof UserController): Promise<void> {
        await this.controller[method](
            this.req as unknown as Request,
            this.res as unknown as Response
        );
    }
}