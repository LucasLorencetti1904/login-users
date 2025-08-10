import { expect, Mock, vi } from "vitest";
import type ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import type UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

export default class MockResponseFormatter implements ResponseDataMapper<any, any> {
    public formatModel = vi.fn(); 

    public method(method: keyof MockResponseFormatter): any {
        return {
            willReturn: (data: UserResponseDTO): void => {
                (this[method] as Mock).mockReturnValue(data); 
            },

            willReturnSequence: (data: UserResponseDTO[]): void => {
                data.map((eachData) => {
                    return (this[method] as Mock).mockReturnValueOnce(eachData)
                });
            }
        };
    }

    public callWith(data: UserModelDTO): void {
        expect (this.formatModel as Mock).toHaveBeenCalledWith(data);
    }

    public doNotCall(): void {
        expect (this.formatModel as Mock).not.toHaveBeenCalled();
    }
}