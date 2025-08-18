import { type Request } from "express";
import { UserRequestDTO } from "@DTOs/UserDTO/UserInputDTO";

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