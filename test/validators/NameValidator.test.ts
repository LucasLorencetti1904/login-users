import errorMessage from "../../src/shared/constants/errorMessage";
import NameValidator from "../../src/shared/util/validators/vanilla/NameValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";

const propertyName: string = "Name";

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new NameValidator("User")).not.toThrowError();
    });

    it (`throws a error message when ${propertyName} is or empty.`, () => {
        expect (() => new NameValidator("")).toThrow(
            propertyName + " " + errorMessage.EMPTY
        );
    });

    it (`throws a error message when ${propertyName} contains number.`, () => {
        expect (() => new NameValidator("User1")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_NUMBER
        );
    });

    it (`throws a error message when ${propertyName} contains less then 4 characters.`, () => {
        expect (() => new NameValidator("Usr")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_LESS_THEN_4_CHARACTERS
        );
    });

    it (`throws a error message when ${propertyName} contains more then 14 characters.`, () => {
        expect (() => new NameValidator("ThisIsMyUserExample")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_MORE_THAN_14_CHARACTERS
        );
    });

    it (`throws a error message when ${propertyName} contains spaces.`, () => {
        expect (() => new NameValidator("Us er")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_SPACE
        );
    });

    it (`throws a error message when ${propertyName} contains special characters.`, () => {
        expect (() => new NameValidator("User_")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_SPECIAL_CHARACTERS
        );
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new NameValidator("This is My User Example 1")).toThrow(
            propertyName + " " + errorMessage.CONTAINS_NUMBER
        );
    }); 
});