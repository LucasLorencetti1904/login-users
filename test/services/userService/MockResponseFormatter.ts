import { expect, Mock, vi } from "vitest";
import ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import { User } from "@prisma/client";

export default class MockResponseFormatter implements ResponseDataMapper<any, any> {
    public formatModel = vi.fn(); 

    public callFormatModelMethodWith(data: User): void {
        expect (this.formatModel as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }
}