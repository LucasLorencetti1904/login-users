import UserRequestDataFormatter from "@mappers/UserRequestDataFormatter";
import UserRepository from "@interfaces/repositories/UserRepository";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserResponseDataFormatter from "@mappers/UserResponseDataFormatter";
import UserValidator from "@validators/userData/UserValidator";
import UserPrismaRepository from "@repositories/userPrismaRepository";
import UserServiceBuilder from "@services/UserServiceBuilder";

let builder: UserServiceBuilder;
let requestFormatter: UserRequestDataFormatter;
let validator: UserValidator;
let repository: UserRepository;
let responseFormatter: UserResponseDataFormatter;

describe ("User Service Builder Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
        builder = new UserServiceBuilder();
        requestFormatter = new UserRequestDataFormatter();
        validator = new UserValidator();
        repository = new UserPrismaRepository();
        responseFormatter = new UserResponseDataFormatter();
    });

    it ("should assign dependencies when the build method is called.", () => {
        expect (
            builder
                .withRequestFormatter(requestFormatter)
                .withValidator(validator)
                .withRepository(repository)
                .withResponseFormatter(responseFormatter)
                .build()
        ).toEqual({
            requestFormatter,
            validator,
            repository,
            responseFormatter
        });
    });

    it ("should throw error when some dependency is missing.", () => {
        expect (
            () => builder
                .withRequestFormatter(requestFormatter)
                .build()
        ).toThrow("Missing dependencies.");
    });
});