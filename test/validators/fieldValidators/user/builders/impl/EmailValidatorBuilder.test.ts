import { beforeEach, describe, expect, it, vi } from "vitest";
import EmailValidatorBuilder from "@validators/fieldValidators/user/builders/impl/EmailValidatorBuilder";
import MockEmailUserPartHandler from "../mocks/MockEmailUserPartHandler";
import MockEmailDomainPartHandler from "../mocks/MockEmailDomainPartHandler";

let builder: EmailValidatorBuilder;

let userHandler: MockEmailUserPartHandler;
let domainHandler: MockEmailDomainPartHandler;

let result: any;

describe ("Email Validator Builder Test", () => {
    beforeEach (() => {
        vi.clearAllMocks();

        builder = new EmailValidatorBuilder();

        userHandler = new MockEmailUserPartHandler();
        domainHandler = new MockEmailDomainPartHandler();
    });

    it ("throws error when field name is missing.", () => {
        result = () => (
            builder
                .withUserPartHandler(userHandler)
                .withDomainPartHandler(domainHandler)
                .build()
        );

        expect (result).toThrowError();
    });

    it ("throws error when domain handler dependence is missing.", () => {
        result = () => (
            builder
                .addFieldName("email")
                .withUserPartHandler(userHandler)
                .build()
        );

        expect (result).toThrowError();
    });

    it ("throws error when user handler dependence is missing.", () => {
        result = () => (
            builder
                .addFieldName("email")
                .withDomainPartHandler(domainHandler)
                .build()
        );

        expect (result).toThrowError();
    });

    it ("returns a EmailValidator when all dependecies is received.", () => {
        result = (
            builder
                .addFieldName("email")
                .withUserPartHandler(userHandler)
                .withDomainPartHandler(domainHandler)
                .build()
        );

        expect (result.fieldName && result.fieldName == "email").toBe(true);
    });
});