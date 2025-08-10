import { vi, describe, beforeEach, it, expect } from "vitest";
import PasswordValidator from "@validators/userData/fieldValidators/password/PasswordValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

const propertyName: string = "password";

const errorTestDescriptionPrefix: string = `throw an error when ${propertyName}`; 

const errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Password");

describe (propertyName + " validator test", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });
    
    it (`passes without error when ${propertyName} is valid.`, () => {
        expect (() => new PasswordValidator("PasswordExample1!")).not.toThrowError();
    });
    
    it (`${errorTestDescriptionPrefix} is empty.`, () => {
        expect (() => new PasswordValidator(""))
        .toThrow(errorMessage.isEmpty);
    });

    it (`${errorTestDescriptionPrefix} contains less then 8 characters.`, () => {
        expect (() => new PasswordValidator("PasEx1!"))
            .toThrow(errorMessage.minLength(8));
    });

    it (`${errorTestDescriptionPrefix} contains more then 20 characters.`, () => {
        expect (() => new PasswordValidator("PasswordExample235689!&$*@$@("))
            .toThrow(errorMessage.maxLength(20));
    });

    it (`${errorTestDescriptionPrefix} is missing letter.`, () => {
        expect (() => new PasswordValidator("12359*&¨%#2"))
            .toThrow(errorMessage.missingAtLeast("one letter"));
    });
        
    it (`${errorTestDescriptionPrefix} is missing number.`, () => {
        expect (() => new PasswordValidator("PasswordExample!"))
            .toThrow(errorMessage.missingAtLeast("one number"));
    });
    
    it (`${errorTestDescriptionPrefix} is missing lowercase letter.`, () => {
        expect (() => new PasswordValidator("PASSWORDEXAMPLE1!"))
            .toThrow(errorMessage.missingAtLeast("one lowercase letter"));
    });

    it (`${errorTestDescriptionPrefix} is missing uppercase letter.`, () => {
        expect (() => new PasswordValidator("passwordexample1!"))
            .toThrow(errorMessage.missingAtLeast("one uppercase letter"));
    });

    it (`${errorTestDescriptionPrefix} is missing special character.`, () => {
        expect (() => new PasswordValidator("PasswordExample1"))
            .toThrow(errorMessage.missingAtLeast("one special character"));
    });

    it (`always throws first error message when ${propertyName} data is invalid.`, () => {
        expect (() => new PasswordValidator("*$@FL(?|@&"))
        .toThrow(errorMessage.missingAtLeast("one number"));
    }); 
});