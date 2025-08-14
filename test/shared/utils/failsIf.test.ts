import failsIf from "@shared/utils/failsIf";
import { beforeEach, describe, expect, it, vi } from "vitest";

class CustomError extends Error {};

describe ("Assertation Throwing Error Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
    });

    it ("throws nothing when assertation is falsy.", () => {
        expect (() => failsIf (
            false, "This error will not be thrown."
        )).not.toThrowError();
    });

    it ("throws a default error when assertation is truthy.", () => {
        expect (() => failsIf (
            true, "This error will be thrown."
        )).toThrowError();
    });

    it ("throws nothing when all elements of assertations array is falsy.", () => {
        expect (() => failsIf (
            [false, false], "This error will not be thrown."
        )).not.toThrowError();
    });

    it ("throws a default error when some element of assertations array is truthy.", () => {
        expect (() => failsIf (
            [true, false], "This error will be thrown."
        )).toThrowError();
    });

    it ("throws nothing when assertation is falsy and custom error third param is received.", () => {
        expect (() => failsIf (
            false, "This custom error will not be thrown.", CustomError
        )).not.toThrowError();
    });

    it ("throws a custom error when assertation is truthy and custom error third param is received.", () => {
        expect (() => failsIf (
            true, "This custom error will be thrown.", CustomError
        )).toThrowError(new CustomError("This custom error will be thrown."));
    });
});