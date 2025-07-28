import { expect, vi } from "vitest";
import { Response } from "express";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

type ResponseJson = {
    message: string,
    data?: UserResponseDTO | UserResponseDTO[]
};

export default class MockResponse implements Partial<Response> {
    public readonly status: any = vi.fn().mockReturnThis();
    public readonly json: any = vi.fn();
    public readonly send: any = vi.fn();

    public callResponseStatusWith(status: number): void {
        expect (this.status).toHaveBeenCalledExactlyOnceWith(status);
    }

    public callResponseJsonWith(responseObject: ResponseJson): void {
        expect (this.json).toHaveBeenCalledExactlyOnceWith(responseObject);
    }

    public callResponseEmpty(): void {
        expect (this.send).toHaveBeenCalledExactlyOnceWith();
    }
}