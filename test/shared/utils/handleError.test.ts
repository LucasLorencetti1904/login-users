import handleError from "@shared/utils/handleError";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe ("Error Handler Test", () => {
    beforeEach (() => {
        vi.clearAllMocks();
    });

    it ("throws a generic string data when param is not an instance of Error.", () => {
        const notAnInstanceError: number = 43;
        expect (() => handleError(notAnInstanceError)).toThrow("43");
    });

    it ("throws a error message when param is an instance of Error.", () => {
        const anErrorInstanceError: Error = new Error("Some error.");
        expect (() => handleError(anErrorInstanceError)).toThrow("Some error.")
    });
});