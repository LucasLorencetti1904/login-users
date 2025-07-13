import { Request } from "express";
import { User } from "../../src/shared/schemas/UserSchema";

export default class MockRequest implements Partial<Request> {
    public params: Partial<{ id?: string }> = {};
    public body: any = {};

    public paramsIdWillBe(value: string | undefined): void {
        this.params.id = value;
    }

    public bodyDataWillBe(value: User): void {
        this.body = value;
    }
}