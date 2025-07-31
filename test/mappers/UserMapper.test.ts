import { describe, beforeEach, vi, it, expect } from "vitest";
import UserDataMapper from "@mappers/UserDataMapper";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import { User } from "@prisma/client";

const reqUserData: UserRequestDTO = {
    username: "   user_example123",
    firstName: " USER  ",
    lastName: "example",
    birthDate: ` 2005-02-18   `,
    email: " UsErexAmplE@gMail.CoM  ",
    password: "UserExample123!*"
};

const formattedUserData: UserFormattedDataDTO = {
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: new Date(reqUserData.birthDate),
    email: "userexample@gmail.com",
    password: reqUserData.password
};

const user: User = {
    id: 1,
    ...formattedUserData,
    createdAt: new Date("2035-04-19"),
    updatedAt: new Date("2035-04-20")
};

const resUserData: UserResponseDTO = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: "18/02/2005",
    email: user.email,
    createdAt: "19/04/2035",
    updatedAt: "20/04/2035"
};

let mapper: UserDataMapper;

describe ("User Mapper Test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mapper = new UserDataMapper();
    });

    it ("returns a formatted user from raw request data when the 'requesToFormatted()' method is used.", () => {
        expect (mapper.requestToFormatted(reqUserData)).toEqual(formattedUserData);
    });

    it ("returns a user response data from model data when the 'modelToResponse()' method is used.", () => {
        expect (mapper.modelToResponse(user)).toEqual(resUserData);
    });
});