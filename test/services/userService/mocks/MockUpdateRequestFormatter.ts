import { expect, Mock, vi } from "vitest";
import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type UpdateUserParsedDTO from "@DTOs/UserDTO/UpdateUserParsedDTO";
import type UpdateUserRequestDTO from "@DTOs/UserDTO/UpdateUserRequestDTO";

export default class MockUpdateRequestFormatter implements RequestDataMapper<any, any> {
    public formatRequest = vi.fn();

    public method(method: keyof MockUpdateRequestFormatter): any {
        return {
            willReturn: (data: UpdateUserParsedDTO): void => {
                (this[method] as Mock).mockReturnValue(data); 
            }
        };
    }

    public callWith(data: UpdateUserRequestDTO): void {
        expect (this.formatRequest as Mock).toHaveBeenCalledExactlyOnceWith(data);
    }

    public doNotCall(): void {
        expect (this.formatRequest as Mock).not.toHaveBeenCalled();
    }
}