import { beforeEach, describe, expect, it, vi } from "vitest";
import UserRequestDataFormatter from "@mappers/UserRequestDataFormatter";
import UserRepository from "@interfaces/repositories/UserRepository";
import UserResponseDataFormatter from "@mappers/UserResponseDataFormatter";
import UserValidator from "@validators/userData/UserValidatorImpl";
import UserPrismaRepository from "@repositories/userPrismaRepository";
import UserServiceBuilder from "@services/UserServiceBuilder";

let builder: UserServiceBuilder;
let validator: UserValidator;
let requestFormatter: UserRequestDataFormatter;
let repository: UserRepository;
let responseFormatter: UserResponseDataFormatter;

describe ("User Service Builder Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
        builder = new UserServiceBuilder();
        validator = new UserValidator();
        requestFormatter = new UserRequestDataFormatter();
        repository = new UserPrismaRepository();
        responseFormatter = new UserResponseDataFormatter();
    });

    it ("should assign dependencies when the build method is called.", () => {
        expect (
            builder
                .withValidator(validator)
                .withRequestFormatter(requestFormatter)
                .withRepository(repository)
                .withResponseFormatter(responseFormatter)
                .build()
        ).toEqual({
            validator,
            requestFormatter,
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