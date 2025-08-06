import { expect, Mock, vi } from "vitest";
import RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";

export default class MockRequestFormatter implements RequestDataMapper<any, any> {
      public formatRequest = vi.fn();

    public callWith(data: UserRequestDTO): void {
        expect (this.formatRequest as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }

    public doNotCall(): void {
        expect (this.formatRequest as Mock).not.toHaveBeenCalled();
    }
}