import { type Request } from "express";
import type UserCreateRequestDTO from "@DTOs/UserDTO/UserCreateRequestDTO";

export default class MockRequest implements Partial<Request> {
    public params: Partial<{ id?: string }> = {};
    public body: any = {};

    public paramsIdWillBe(value?: string): void {
        this.params.id = value;
    }

    public bodyDataWillBe(value: UserCreateRequestDTO): void {
        this.body = value;
    }
}