import { describe, beforeEach, vi, test, expect } from "vitest";
import type { CreateUserRequestDTO, CreateUserParsedDTO } from "@DTOs/UserDTO/CreateUserDTO";
import capitalize from "@shared/utils/capitalize";
import UserDataFormatter from "@mappers/UserDataFormatter";

const reqUserData: CreateUserRequestDTO = {
    username: "   user_example123",
    firstName: " USER  ",
    lastName: "example ",
    birthDate: ` 2005-02-18   `,
    email: " UsErexAmplE@gMail.CoM  ",
    password: "  UserExample123!* "
};

const mapper: UserDataFormatter = new UserDataFormatter();

const formattedUserData: CreateUserParsedDTO = mapper.formatCreateRequest(reqUserData);


function isTrimmed(str: string): boolean {
    return !str.startsWith(" ") && !str.endsWith(" ");
}

describe ("User Mapper Test.", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test ("The user username must be trimmed.", () => {
        expect (isTrimmed(formattedUserData.username)).toBe(true);
    });

    test.each ([
        ["firstName", reqUserData.firstName],
        ["lastName", reqUserData.lastName]
    ] as const)("The user %s must be trimmed and capitalized.", (key, expected) => {
        expect (isTrimmed(formattedUserData[key])).toBe(true);

        expect (formattedUserData[key]).toBe(capitalize(expected.trim()));
    });

    test ("The user birth date must instantiate Date.", () => {
        expect (formattedUserData.birthDate).toBeInstanceOf(Date);
    });

    test ("The user email must be trimmed and lowered.", () => {
        expect (isTrimmed(formattedUserData.email)).toBe(true);
        
        expect (formattedUserData.email).toBe(reqUserData.email.toLowerCase().trim());
    });

    test ("The user password must be the same.", () => {
        expect (reqUserData.password).toEqual(formattedUserData.password);
    });
});