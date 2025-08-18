import { beforeEach, describe, expect, it, vi } from "vitest";
import UserServiceBuilder from "@services/UserServiceBuilder";
import MockValidator from "../mocks/MockValidator";
import MockRequestFormatter from "../mocks/MockRequestFormatter";
import MockHasher from "../mocks/MockHasher";
import MockRepository from "../mocks/MockRepository";
import MockResponseFormatter from "../mocks/MockResponseFormatter";
import type UserValidator from "@interfaces/validators/Validator";
import type RequestDataMapper from "@interfaces/mappers/UserDataMapper";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import type UserRepository from "@interfaces/repositories/UserRepository";
import type ResponseDataMapper from "@interfaces/mappers/UserResponseDataMapper";
import UserDataMapper from "@interfaces/mappers/UserDataMapper";

let builder: UserServiceBuilder;
let mockValidator: MockValidator;
let mockFormatter: MockRequestFormatter;
let mockHasher: MockHasher;
let mockRepository: MockRepository;

const password: string = "123456789";
class MockPasswordValidator {}
const fieldsAndValidators: [any, any][] = [
    [password, new MockPasswordValidator()]
]; 

describe ("User Service Builder Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
        builder = new UserServiceBuilder();
        mockValidator = new MockValidator(fieldsAndValidators);
        mockFormatter = new MockRequestFormatter();
        mockHasher = new MockHasher();
        mockRepository = new MockRepository();
    });

    it ("should assign dependencies when the build method is called.", () => {
        expect (
            builder
                .withValidator(mockValidator as UserValidator)
                .withDataFormatter(mockFormatter as UserDataMapper)
                .withHasher(mockHasher as PasswordHasher)
                .withRepository(mockRepository as UserRepository)
                .build()
        ).toEqual({
            validator: mockValidator,
            formatter: mockFormatter,
            hasher: mockHasher,
            repository: mockRepository,
        });
    });

    it ("should throw error when some dependency is missing.", () => {
        expect (
            () => builder
                .withDataFormatter(mockFormatter as UserDataMapper)
                .build()
        ).toThrow("Missing dependencies.");
    });
});