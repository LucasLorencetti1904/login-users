import { expect, Mock, vi } from "vitest";
import ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import UserModelDTO from "@DTOs/UserDTO/UserModelDTO";

export default class MockResponseFormatter implements ResponseDataMapper<any, any> {
    public formatModel = vi.fn(); 

    public callFormatModelMethodWith(data: UserModelDTO): void {
        expect (this.formatModel as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }
}