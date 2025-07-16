import EmailValidator from "../../src/shared/util/validators/vanilla/EmailValidator";
import errorMessage from "../../src/shared/constants/errorMessage";
import { vi, describe, beforeEach, it, expect } from "vitest";

const propertyName: string = "Email";

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new EmailValidator("user@gmail.com")).not.toThrowError();
    });

    it (`throws a error message when ${propertyName} is or empty.`, () => {
        expect (() => new EmailValidator("")).toThrow(
            propertyName + " " + errorMessage.EMPTY
        );
    });

    it (`throws a error message when ${propertyName} not includes '@'.`, () => {
        expect (() => new EmailValidator("usergmail.com")).toThrow(
            propertyName + " " + errorMessage.MISSING_SYMBOL
        );
    });


    it (`throws a error message when ${propertyName} starts with a invalid character.`, () => {
        expect (() => new EmailValidator("1user@gmail.com")).toThrow(
            propertyName + " " + errorMessage.STARTS_WITH_INVALID_CHARACTER
        );
    });

    it (`throws a error message when ${propertyName} domain contains less then 4 characters.`, () => {
        expect (() => new EmailValidator("usr@gmail.com")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_LESS_THEN_4_CHARACTERS
        );
    });

    it (`throws a error message when ${propertyName} domain contains more then 64 characters.`, () => {
        expect (() => new EmailValidator(
            "useruseruseruseruseruseruseruseruseruseruseruseruseruseruseruseruser@gmail.com"
        )).toThrow(
            propertyName + " " + errorMessage.CONTAINS_MORE_THAN_64_CHARACTERS
        );
    });

    it (`throws a error message when ${propertyName} contains spaces.`, () => {
        expect (() => new EmailValidator("user @gmail.com")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_SPACE
        );
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new EmailValidator("usrgmail.com")).toThrow(
            propertyName + " " + errorMessage.MISSING_SYMBOL
        );
    }); 
});