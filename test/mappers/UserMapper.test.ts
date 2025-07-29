import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserDataMapper from "@mappers/UserDataMapper";
import { describe, beforeEach, vi, it, expect } from "vitest";
import bcrypt from "bcryptjs";
import UserCreateDataDTO from "@DTOs/UserDTO/UserCreateDataDTO";
import { User } from "@prisma/client";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

const exampleOfBirthDate: string = "2005-19-05";

const rawUserData: UserRequestDTO = {
    username: "   user_example123",
    firstName: " USER  ",
    lastName: "example",
    birthDate: ` ${exampleOfBirthDate}   `,
    email: " UsErexAmplE@gMail.CoM  ",
    password: "UserExample123!*"
}


const userNormalizedCreateData: UserCreateDataDTO = {
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: new Date(exampleOfBirthDate),
    email: "userexample@gmail.com",
    password: bcrypt.hashSync(rawUserData.password, 10)
}


const createdAtDateExample: string = "2035-04-19";
const updatedAtDateExample: string = "2035-04-20";

const user: User = {
    id: 1,
    ...userNormalizedCreateData,
    createdAt: new Date(createdAtDateExample),
    updatedAt: new Date(updatedAtDateExample)
}

const userFilteredResponseData: UserResponseDTO = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    birthDate: exampleOfBirthDate,
    email: user.email,
    createdAt: createdAtDateExample,
    updatedAt: updatedAtDateExample
}

describe ("User Mapper Test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it ("returns a formatted user from raw data when the 'rawToModel()' method is used.", () => {
        expect (UserDataMapper.rawToNormalized(rawUserData)).toEqual(userNormalizedCreateData);
    });

    it ("returns a user response data from model data when the 'ModelToResponse()' method is used.", () => {
        expect (UserDataMapper.modelToResponse(user)).toEqual(userFilteredResponseData);
    });
});