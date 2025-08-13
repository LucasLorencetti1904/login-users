import { vi, describe, beforeEach, it, expect } from "vitest";
import BirthDateValidator from "@validators/userData/fieldValidators/user/birthDate/BirthDateValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "birthDate";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`; 

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("BirthDate");

let validator: BirthDateValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new BirthDateValidator();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("2003-02-28")).not.toThrowError();
    });

    it (`${errorTestDescriptionPrefix} has an invalid format.`, () => {
        expect (() => validator.validate("2003-a3-28")).toThrow(errorMessage.hasAnInvalidFormat);
    });
    
    it (`${errorTestDescriptionPrefix} year is invalid.`, () => {
        expect (() => validator.validate("4048-02-28")).toThrow(errorMessage.hasInvalid("year"));
    });
        
    it (`${errorTestDescriptionPrefix} month is invalid.`, () => {
        expect (() => validator.validate("2003-13-28")).toThrow(errorMessage.hasInvalid("month"));
    });
        
    it (`${errorTestDescriptionPrefix} day is invalid.`, () => {
        expect (() => validator.validate("2003-02-29")).toThrow(errorMessage.hasInvalid("day"));
    });
});