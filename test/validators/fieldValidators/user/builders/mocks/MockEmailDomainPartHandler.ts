import { Mock, vi } from "vitest";
import type EmailPartHandler from "@interfaces/validators/EmailPartHandler";

export default class MockEmailDomainPartHandler implements EmailPartHandler {
    public handle: Mock = vi.fn();
}