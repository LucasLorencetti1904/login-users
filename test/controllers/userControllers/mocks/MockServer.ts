import { type Request, type Response } from "express";
import MockRequest from "./MockRequest";
import MockResponse from "./MockResponse";

type ControllerMethod = (req: Request, res: Response) => unknown;

export default class MockServer<TController> {
    public constructor(
        private readonly controller: TController,
        private readonly req: MockRequest,
        private readonly res: MockResponse
    ) {}

    public async initUserControllerMethod(method: keyof TController): Promise<void> {
        await (this.controller[method] as ControllerMethod)(
            this.req as unknown as Request,
            this.res as unknown as Response
        );
    }
}