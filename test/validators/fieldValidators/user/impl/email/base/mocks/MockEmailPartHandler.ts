import { Mock, vi } from "vitest";
import type EmailPartHandler from "@interfaces/validators/EmailPartHandler";

export default abstract class MockEmailPartHandler implements EmailPartHandler {
    public handle: Mock = vi.fn();

    public willFail(): void {
        this.handle.mockImplementation(() => {
            throw new Error();
        });
    }
}