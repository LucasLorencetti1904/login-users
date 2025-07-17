import EmailValidator from "../../src/shared/util/validators/vanilla/EmailValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";
import ErrorMessageGenerator from "../../src/shared/helpers/ErrorMessageGenerator";

const propertyName: string = "Email";

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName(propertyName); 

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new EmailValidator("user@gmail.com")).not.toThrowError();
    });

    it (`throws a error message when ${propertyName} is or empty.`, () => {
        expect (() => new EmailValidator("")).toThrow(errorMessage.isEmpty);
    });

    it (`throws a error message when ${propertyName} not includes '@'.`, () => {
        expect (() => new EmailValidator("usergmail.com")).toThrow(errorMessage.missing("@"));
    });


    it (`throws a error message when ${propertyName} starts with a invalid character.`, () => {
        expect (() => new EmailValidator("1user@gmail.com"))
            .toThrow(errorMessage.startsWith("invalid characters"));
    });

    it (`throws a error message when ${propertyName} domain contains less then 4 characters.`, () => {
        expect (() => new EmailValidator("usr@gmail.com"))
            .toThrow(errorMessage.minLength(4));
    });

    it (`throws a error message when ${propertyName} domain contains more then 64 characters.`, () => {
        expect (() => new EmailValidator(
            "useruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser@gmail.com"
        ))
            .toThrow(errorMessage.maxLength(64));
    });

    it (`throws a error message when ${propertyName} contains spaces.`, () => {
        expect (() => new EmailValidator("user @gmail.com"))
            .toThrow(errorMessage.contains("spaces"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new EmailValidator("usrgmail.com"))
            .toThrow(errorMessage.missing("@"));
    }); 
});