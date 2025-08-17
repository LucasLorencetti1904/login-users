import { type Request } from "express";
import type CreateUserRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";
import type UpdateUserRequestDTO from "@DTOs/UserDTO/UpdateUserRequestDTO"

export default class MockRequest implements Partial<Request> {
    public params: Partial<{ id?: string }> = {};
    public body: any = {};

    public paramsIdWillBe(value?: string): void {
        this.params.id = value;
    }

    public bodyDataWillBe(value: CreateUserRequestDTO | UpdateUserRequestDTO): void {
        this.body = value;
    }
}