import { beforeEach, describe, expect, it, vi } from "vitest";
import handleError from "@shared/utils/handleError";

class MockCustomError extends Error {}

describe ("Error Handler Test", () => {
    beforeEach (() => {
        vi.clearAllMocks();
    });

    it ("throws a generic Error with string data when first param is not an instance of Error and second param is undefined.", () => {
        const notAnInstanceError: number = 43;
        expect (() => handleError(notAnInstanceError)).toThrowError(
            new Error("43")
        );
    });

    it ("throws a generic Error with error message when first param is an instance of Error and second param is undefined.", () => {
        const anErrorInstanceError: Error = new Error("Some error.");
        expect (() => handleError(anErrorInstanceError)).toThrowError(
            new Error("Some error.")
        );
    });

    it ("throws a custom Error with string data when first param is not an instance of Error and second param is defined.", () => {
        const notAnInstanceError: number = 43;
        expect (() => handleError(notAnInstanceError, MockCustomError)).toThrowError(
            new MockCustomError("43")
        );
    });

    it ("throws a custom Error with error message when first param is an instance of Error and second param is defined.", () => {
        const anErrorInstanceError: Error = new Error("Some error.");
        expect (() => handleError(anErrorInstanceError, MockCustomError)).toThrowError(
            new MockCustomError("Some error.")
        );
    });
});