import { describe, beforeEach, vi, test, expect } from "vitest";
import UserResponseDataFormatter from "@mappers/UserResponseDataFormatter";
import ResponseDataMapper from "@mappers/ResponseDataMapper";
import { User } from "@prisma/client";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import { format } from "date-fns";

const user: User = {
    id: 1,
    username: "user_example123",
    firstName: "User",
    lastName: "Example",
    birthDate: new Date("2005-02-18"),
    email: "userexample@gmail.com",
    password: "$2b$10$3aPHH.J2EDQU5t/NNiyZIeEVUK8gQKDjRYxBrbcdtF0R3MZ7e.cq2",
    createdAt: new Date("2035-04-19"),
    updatedAt: new Date("2035-04-20")
};

const mapper: ResponseDataMapper<User, UserResponseDTO> = new UserResponseDataFormatter();

const resUserData: UserResponseDTO = mapper.formatModel(user);

describe ("User Mapper Test.", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test.each ([
        ["id", user.id],
        ["username", user.username],
        ["firstName", user.firstName],
        ["lastName", user.lastName],
        ["email", user.email]
    ] as const)("The user %s must be the same", (key, expected) => {
        expect (resUserData[key]).toBe(expected);
    });

    test ("The user birthDate must be string and contain the dd/MM/yyyy format.", () => {
        expect (resUserData.createdAt).toBeTypeOf("string");

        expect (resUserData.birthDate).toBe(format(user.birthDate, "dd/MM/yyyy"));
    });
    
    test ("The user response object must not be contain the password field.", () => {
        expect (resUserData).not.toHaveProperty("password");
    });
    
    test ("The user createdAt (timestamp) must be string and contain the dd/MM/yyyy format.", () => {
        expect (resUserData.createdAt).toBeTypeOf("string");

        expect (resUserData.createdAt).toBe(format(user.createdAt, "dd/MM/yyyy"));
    });
    
    test ("The user updatedAt (timestamp) must be string and contain the dd/MM/yyyy format.", () => {
        expect (resUserData.createdAt).toBeTypeOf("string");

        expect (resUserData.updatedAt).toBe(format(user.updatedAt, "dd/MM/yyyy"));
    });
});