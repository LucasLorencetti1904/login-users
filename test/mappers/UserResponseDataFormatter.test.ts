import { describe, beforeEach, vi, test, expect } from "vitest";
import type UserModelDTO from "@DTOs/UserDTO/UserModelDTO";
import type ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";
import type UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";
import UserResponseDataFormatter from "@mappers/UserResponseDataFormatter";
import formatDateToDDMMYYYY from "@shared/utils/formatDateToDDMMYYYY";

const user: UserModelDTO = {
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

const mapper: ResponseDataMapper<UserModelDTO, UserResponseDTO> = new UserResponseDataFormatter();

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

        expect (resUserData.birthDate).toBe(formatDateToDDMMYYYY(user.birthDate));
    });
    
    test ("The user response object must not be contain the password field.", () => {
        expect (resUserData).not.toHaveProperty("password");
    });
    
    test ("The user createdAt (timestamp) must be string and contain the dd/MM/yyyy format.", () => {
        expect (resUserData.createdAt).toBeTypeOf("string");

        expect (resUserData.createdAt).toBe(formatDateToDDMMYYYY(user.createdAt));
    });
    
    test ("The user updatedAt (timestamp) must be string and contain the dd/MM/yyyy format.", () => {
        expect (resUserData.createdAt).toBeTypeOf("string");

        expect (resUserData.updatedAt).toBe(formatDateToDDMMYYYY(user.updatedAt));
    });
});