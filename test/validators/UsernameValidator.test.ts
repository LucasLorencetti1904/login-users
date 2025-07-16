import UsernameValidator from "../../src/shared/util/validators/vanilla/UsernameValidator";
import errorMessage from "../../src/shared/constants/errorMessage";;
import { vi, describe, beforeEach, it, expect } from "vitest";

const propertyName: string = "Username";

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new UsernameValidator("XxL3M4OxX")).not.toThrowError();
    });

    it (`throws a error message when ${propertyName} is or empty.`, () => {
        expect (() => new UsernameValidator("")).toThrow(
        propertyName + " " + errorMessage.EMPTY
        );
    });

    it (`throws a error message when ${propertyName} starts with a number.`, () => {
        expect (() => new UsernameValidator("1XxL3M4OXx")).toThrow(
            propertyName + " " + errorMessage.STARTS_WITH_NUMBER
        );
    });

    it (`throws a error message when ${propertyName} contains less then 4 characters.`, () => {
        expect (() => new UsernameValidator("XxL")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_LESS_THEN_4_CHARACTERS
        );
    });

    it (`throws a error message when ${propertyName} contains more then 10 characters.`, () => {
        expect (() => new UsernameValidator("XxL3M4OXxxx")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_MORE_THAN_10_CHARACTERS
        );
    });

    it (`throws a error message when ${propertyName} contains spaces.`, () => {
        expect (() => new UsernameValidator("XxL3 M4OXx")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_SPACE
        );
    });

    it (`throws a error message when ${propertyName} contains special characters.`, () => {
        expect (() => new UsernameValidator("XxL3*M4OXx")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_SPECIAL_CHARACTERS
        );
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new UsernameValidator("1XxL3*M4O Xxxx")).toThrow(
            propertyName + " " + errorMessage.STARTS_WITH_NUMBER
        );
    }); 
});