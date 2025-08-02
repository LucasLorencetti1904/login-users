import ResponseDataMapper from "@mappers/ResponseDataMapper";
import { User } from "@prisma/client";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import { format } from "date-fns";

export default class UserResponseDataFormatter implements ResponseDataMapper<User, UserResponseDTO> {
    public formatModel(model: User): UserResponseDTO {
        const { password, ...safityFields } = model;

        return {
            ...safityFields,
            birthDate: this.formatDateField(model.birthDate),
            createdAt: this.formatDateField(model.createdAt),
            updatedAt: this.formatDateField(model.updatedAt)
        };
    };

    private formatDateField(dateField: Date): string {
        return format(dateField, "dd/MM/yyyy");
    };
}