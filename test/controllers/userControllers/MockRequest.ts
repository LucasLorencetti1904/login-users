import { Request } from "express";
import type UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";

export default class MockRequest implements Partial<Request> {
    public params: Partial<{ id?: string }> = {};
    public body: any = {};

    public paramsIdWillBe(value?: string): void {
        this.params.id = value;
    }

    public bodyDataWillBe(value: UserRequestDTO): void {
        this.body = value;
    }
}