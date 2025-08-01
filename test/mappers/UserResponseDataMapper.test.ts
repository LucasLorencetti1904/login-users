import { describe, beforeEach, vi, it, expect } from "vitest";
import UserResponseDataMapper from "@mappers/UserResponseDataMapper";
import ResponseDataMapper from "@mappers/ResponseDataMapper";
import { User } from "@prisma/client";
import UserResponseDTO from "@DTOs/UserDTO/UserResponseDTO";

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

let mapper: ResponseDataMapper<User, UserResponseDTO>;

describe ("User Mapper Test.", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mapper = new UserResponseDataMapper();
    });

    it ("returns a user response data from model data when method is used.", () => {
        expect (mapper.modelToResponse(user)).toEqual(resUserData);
    });
});