import { vi, describe, beforeEach, it, expect } from "vitest";
import PasswordValidator from "@validators/userData/fieldValidators/user/password/PasswordValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "password";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`; 

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Password");

let validator: PasswordValidator;

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();

        validator = new PasswordValidator();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => validator.validate("PasswordExample1!")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => validator.validate(""))
        .toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} contains less then 8 characters.`, () => {
        expect (() => validator.validate("PasEx1!"))
            .toThrow(errorMessage.minLength(8));
    });

    it (`${errorTestDescriptionPrefix} contains more then 20 characters.`, () => {
        expect (() => validator.validate("PasswordExample235689!&$*@$@("))
            .toThrow(errorMessage.maxLength(20));
    });

    it (`${errorTestDescriptionPrefix} is missing letter.`, () => {
        expect (() => validator.validate("12359*&¨%#2"))
            .toThrow(errorMessage.missingAtLeast("one letter"));
    });
        
    it (`${errorTestDescriptionPrefix} is missing number.`, () => {
        expect (() => validator.validate("PasswordExample!"))
            .toThrow(errorMessage.missingAtLeast("one number"));
    });
    
    it (`${errorTestDescriptionPrefix} is missing lowercase letter.`, () => {
        expect (() => validator.validate("PASSWORDEXAMPLE1!"))
            .toThrow(errorMessage.missingAtLeast("one lowercase letter"));
    });

    it (`${errorTestDescriptionPrefix} is missing uppercase letter.`, () => {
        expect (() => validator.validate("passwordexample1!"))
            .toThrow(errorMessage.missingAtLeast("one uppercase letter"));
    });

    it (`${errorTestDescriptionPrefix} is missing special character.`, () => {
        expect (() => validator.validate("PasswordExample1"))
            .toThrow(errorMessage.missingAtLeast("one special character"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => validator.validate("*$@FL(?|@&"))
        .toThrow(errorMessage.missingAtLeast("one number"));
    }); 
});