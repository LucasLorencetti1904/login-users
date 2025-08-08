import { beforeEach, describe, expect, it, vi } from "vitest";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

let generator: ErrorMessageGenerator;
let expectedMessage: string;

describe ("Error Message Generator Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
    });

    it (`must be instantiated with messages contain a default capitalized data name when initWithDataName() method is called.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("Email");

        expect (generator.hasAnInvalidFormat.includes("Email")).toBe(true);
    });

    it (`returns a empty data error message when "isEmpty" property is called.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("Password")
        expectedMessage = "Password cannot be empty.";

        expect (generator.isEmpty).toBe(expectedMessage);
    });

    it (`returns a invalid format data error message when "hasAnInvalidFormat" property is called.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("CPF")
        expectedMessage = "CPF must have a valid format.";

        expect (generator.hasAnInvalidFormat).toBe(expectedMessage);
    });

    it (`returns a content error message when "contains()" method is called with a string param.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("Street")
        expectedMessage = "Street cannot contain numbers.";

        expect (generator.contains("numbers")).toBe(expectedMessage);
    });

    it (`returns a missing content error message when "missing()" method is called with a string param.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("Code")
        expectedMessage = "Code must contain letters.";

        expect (generator.missing("letters")).toBe(expectedMessage);
    });

    it (`returns a missing at least content error message when "missingAtLeast()" method is called with a string param.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("Code")
        expectedMessage = "Code must contain at least 1 letter.";

        expect (generator.missingAtLeast("1 letter")).toBe(expectedMessage);
    });

    it (`returns a start char error message when "startsWith()" method is called with a string param.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("usERname")
        expectedMessage = "usERname cannot start with number.";

        expect (generator.startsWith("number")).toBe(expectedMessage);
    });

    it (`returns a invalid content error message when "hasInvalid()" method is called with a string param.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("Email")
        expectedMessage = "Email DOMAIN must be valid.";

        expect (generator.hasInvalid("DOMAIN")).toBe(expectedMessage);
    });
    
    it (`returns a min length size error message when "minLength()" method is called with a number param.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("Name")
        expectedMessage = "Name must be at least 4 characters.";

        expect (generator.minLength(4)).toBe(expectedMessage);
    });

    it (`returns a max length size error message when "maxLength()" method is called with a number param.`, () => {
        generator = ErrorMessageGenerator.initWithDataName("Name")
        expectedMessage = "Name must be at most 12 characters.";

        expect (generator.maxLength(12)).toBe(expectedMessage);
    });
});