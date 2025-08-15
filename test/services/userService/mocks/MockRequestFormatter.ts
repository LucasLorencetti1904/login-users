import { expect, Mock, vi } from "vitest";
import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import type UserCreateRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";

export default class MockRequestFormatter implements RequestDataMapper<any, any> {
    public formatRequest = vi.fn();

    public method(method: keyof MockRequestFormatter): any {
        return {
            willReturn: (data: UserFormattedDataDTO): void => {
                (this[method] as Mock).mockReturnValue(data); 
            }
        };
    }

    public callWith(data: UserCreateRequestDTO): void {
        expect (this.formatRequest as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }

    public doNotCall(): void {
        expect (this.formatRequest as Mock).not.toHaveBeenCalled();
    }
}