import { beforeEach, describe, expect, it, vi } from "vitest";
import UserServiceBuilder from "@services/UserServiceBuilder";
import type Validator from "@interfaces/validators/Validator";
import type UserDataMapper from "@interfaces/mappers/UserDataMapper";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";
import type UserRepository from "@interfaces/repositories/UserRepository";
import {
    MockCreateUserValidator,
    MockHasher, MockRepository,
    MockUpdateUserValidator,
    MockUserDataFormatter
} from "../mocks/UserServiceBuilderMocks";
import type UserService from "@interfaces/services/UserService";

let builder: UserServiceBuilder;
let mockCreateUserValidator: MockCreateUserValidator;
let mockUpdateUserValidator: MockUpdateUserValidator;
let mockFormatter: MockUserDataFormatter;
let mockHasher: MockHasher;
let mockRepository: MockRepository;


describe ("User Service Builder Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
        builder = new UserServiceBuilder();
        mockCreateUserValidator = new MockCreateUserValidator();
        mockUpdateUserValidator = new MockUpdateUserValidator();
        mockFormatter = new MockUserDataFormatter();
        mockHasher = new MockHasher();
        mockRepository = new MockRepository();
    });

    it ("should assign dependencies when the build method is called.", () => {
        const service: UserService = builder
            .withCreateDataValidator(mockCreateUserValidator as Validator)
            .withUpdateDataValidator(mockUpdateUserValidator as Validator)
            .withDataFormatter(mockFormatter as UserDataMapper)
            .withHasher(mockHasher as PasswordHasher)
            .withRepository(mockRepository as UserRepository)
            .build();

        expect (service).toBeDefined();
    });

    it ("should throw error when some 'CreateUserDataValidator' dependency is missing.", () => {
        expect (
            () => builder
                .withUpdateDataValidator(mockUpdateUserValidator as Validator)
                .withDataFormatter(mockFormatter as UserDataMapper)
                .withHasher(mockHasher as PasswordHasher)
                .withRepository(mockRepository as UserRepository)
                .build()
        ).toThrowError();
    });

    it ("should throw error when some 'UpdateUserDataValidator' dependency is missing.", () => {
        expect (
            () => builder
                .withCreateDataValidator(mockCreateUserValidator as Validator)
                .withDataFormatter(mockFormatter as UserDataMapper)
                .withHasher(mockHasher as PasswordHasher)
                .withRepository(mockRepository as UserRepository)
                .build()
        ).toThrowError();
    });

    it ("should throw error when some 'DataFormatter' dependency is missing.", () => {
        expect (
            () => builder
                .withCreateDataValidator(mockCreateUserValidator as Validator)
                .withUpdateDataValidator(mockUpdateUserValidator as Validator)
                .withHasher(mockHasher as PasswordHasher)
                .withRepository(mockRepository as UserRepository)
                .build()
        ).toThrowError();
    });

    it ("should throw error when some 'Hasher' dependency is missing.", () => {
        expect (
            () => builder
                .withCreateDataValidator(mockCreateUserValidator as Validator)
                .withUpdateDataValidator(mockUpdateUserValidator as Validator)
                .withDataFormatter(mockFormatter as UserDataMapper)
                .withRepository(mockRepository as UserRepository)
                .build()
        ).toThrowError();
    });

    it ("should throw error when some 'Repository' dependency is missing.", () => {
        expect (
            () => builder
                .withCreateDataValidator(mockCreateUserValidator as Validator)
                .withUpdateDataValidator(mockUpdateUserValidator as Validator)
                .withDataFormatter(mockFormatter as UserDataMapper)
                .withHasher(mockHasher as PasswordHasher)
                .build()
        ).toThrowError();
    });
});