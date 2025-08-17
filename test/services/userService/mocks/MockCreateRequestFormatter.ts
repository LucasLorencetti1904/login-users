import { expect, Mock, vi } from "vitest";
import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type CreateUserParsedDTO from "@DTOs/UserDTO/CreateUserParsedDTO";
import type CreateUserRequestDTO from "@DTOs/UserDTO/CreateUserRequestDTO";

export default class MockCreateRequestFormatter implements RequestDataMapper<any, any> {
    public formatRequest = vi.fn();

    public method(method: keyof MockCreateRequestFormatter): any {
        return {
            willReturn: (data: CreateUserParsedDTO): void => {
                (this[method] as Mock).mockReturnValue(data); 
            }
        };
    }

    public callWith(data: CreateUserRequestDTO): void {
        expect (this.formatRequest as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }

    public doNotCall(): void {
        expect (this.formatRequest as Mock).not.toHaveBeenCalled();
    }
}