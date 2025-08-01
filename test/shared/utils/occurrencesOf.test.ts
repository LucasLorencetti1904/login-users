import occurrencesOf from "@shared/utils/occurrencesOf";
import { describe, beforeEach, vi, it, expect } from "vitest";

describe ("String specific char counter Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
    })

    it (`returns 3 when it is called with "-" and "FH5R-JGDI-2RH8-4D56".`, () => {
        expect (occurrencesOf("-", "FH5R-JGDI-2RH8-4D56")).toBe(3);
    });

    it (`returns 0 when it is called with "a" and "Hello World!".`, () => {
        expect (occurrencesOf("a", "Hello World!")).toBe(0);
    });
});