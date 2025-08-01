import { describe, beforeEach, vi, expect } from "vitest";
import UserRequestDataMapper from "@mappers/UserRequestDataMapper";
import UserRequestDTO from "@DTOs/UserDTO/UserRequestDTO";
import UserFormattedDataDTO from "@DTOs/UserDTO/UserFormattedDataDTO";
import RequestDataMapper from "@mappers/RequestDataMapper";
import test from "node:test";

const reqUserData: UserRequestDTO = {
    username: "   user_example123",
    firstName: " USER  ",
    lastName: "example",
    birthDate: ` 2005-02-18   `,
    email: " UsErexAmplE@gMail.CoM  ",
    password: "  UserExample123! *"
};

const formattedUserData: UserFormattedDataDTO = {
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: new Date("2005-02-18"),
    email: "userexample@gmail.com",
    password: reqUserData.password
};

let mapper: RequestDataMapper<UserRequestDTO, UserFormattedDataDTO>;

describe ("User Mapper Test.", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mapper = new UserRequestDataMapper();
    });

    test ("The mapper method must return a formatted user from raw request data when method is used.", () => {
        expect (mapper.requestToFormatted(reqUserData)).toEqual(formattedUserData);
    });
});