import { describe, beforeEach, vi, it, expect } from "vitest";
import capitalize from "@shared/utils/capitalize";

const capitalizedString: string = "Example";

describe ("String capitalization Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
    });

    it (`capitalizes lowercase strings.`, () => {
        expect (capitalize("example")).toBe(capitalizedString);
    });

    it (`converts uppercase string to lowercase and capitalizes it.`, () => {
        expect (capitalize("EXAMPLE")).toBe(capitalizedString);
    });

    it (`convert randomcase string to lowercase and capitalizes it.`, () => {
        expect (capitalize("eXamPLe")).toBe(capitalizedString);
    });
});