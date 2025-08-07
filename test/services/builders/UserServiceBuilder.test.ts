import { beforeEach, describe, expect, it, vi } from "vitest";
import UserServiceBuilder from "@services/UserServiceBuilder";
import MockValidator from "./MockValidator";
import MockRequestFormatter from "./MockRequestFormatter";
import MockRepository from "./MockRepository";
import MockResponseFormatter from "./MockResponseFormatter";
import MockHasher from "./MockHasher";
import type UserValidator from "@interfaces/validators/UserValidator";
import type RequestDataMapper from "@interfaces/mappers/RequestDataMapper";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import type UserRepository from "@interfaces/repositories/UserRepository";
import type ResponseDataMapper from "@interfaces/mappers/ResponseDataMapper";

let builder: UserServiceBuilder;
let mockValidator: MockValidator;
let mockRequestFormatter: MockRequestFormatter;
let mockHasher: MockHasher;
let mockRepository: MockRepository;
let mockResponseFormatter: MockResponseFormatter;

describe ("User Service Builder Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
        builder = new UserServiceBuilder();
        mockValidator = new MockValidator();
        mockRequestFormatter = new MockRequestFormatter();
        mockHasher = new MockHasher();
        mockRepository = new MockRepository();
        mockResponseFormatter = new MockResponseFormatter();
    });

    it ("should assign dependencies when the build method is called.", () => {
        expect (
            builder
                .withValidator(mockValidator as UserValidator)
                .withRequestFormatter(mockRequestFormatter as RequestDataMapper<any, any>)
                .withHasher(mockHasher as PasswordHasher)
                .withRepository(mockRepository as UserRepository)
                .withResponseFormatter(mockResponseFormatter as ResponseDataMapper<any, any>)
                .build()
        ).toEqual({
            validator: mockValidator,
            requestFormatter: mockRequestFormatter,
            hasher: mockHasher,
            repository: mockRepository,
            responseFormatter: mockResponseFormatter
        });
    });

    it ("should throw error when some dependency is missing.", () => {
        expect (
            () => builder
                .withRequestFormatter(mockRequestFormatter as RequestDataMapper<any, any>)
                .build()
        ).toThrow("Missing dependencies.");
    });
});