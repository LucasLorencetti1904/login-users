import ErrorMessageGenerator from "../../../src/shared/helpers/ErrorMessageGenerator";
import BirthDateValidator from "../../../src/shared/util/validators/vanilla/birthDate/BirthDateValidator";
import { vi, describe, beforeEach, it, expect } from "vitest";

const propertyName: string = "birthDate";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`; 

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("BirthDate");

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new BirthDateValidator("2003-02-28")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid format.`, () => {
        expect (() => new BirthDateValidator("2003-a3-28")).toThrow(errorMessage.hasAnInvalidFormat);
    });
    
    it (`${errorTestDescriptionPrefix} year is invalid.`, () => {
        expect (() => new BirthDateValidator("4048-02-28")).toThrow(errorMessage.hasInvalid("year"));
    });
        
    it (`${errorTestDescriptionPrefix} month is invalid.`, () => {
        expect (() => new BirthDateValidator("2003-13-28")).toThrow(errorMessage.hasInvalid("month"));
    });
        
    it (`${errorTestDescriptionPrefix} day is invalid.`, () => {
        expect (() => new BirthDateValidator("2003-02-29")).toThrow(errorMessage.hasInvalid("day"));
    });
});