import ResponseDataMapper from "./ResponseDataMapper";
import { User } from "@prisma/client";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import { format } from "date-fns";

export default class UserResponseDataMapper implements ResponseDataMapper<User, UserResponseDTO> {
    public modelToResponse(model: User): UserResponseDTO {
        const { password, ...safetyFields } = model;
        
        return {
            ...safetyFields,
            birthDate: this.formatDateField(model.birthDate),
            createdAt: this.formatDateField(model.createdAt),
            updatedAt: this.formatDateField(model.updatedAt)
        }
    };

    private formatDateField(dateField: Date): string {
        return format(dateField, "dd/MM/yyyy");
    };
}