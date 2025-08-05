import { beforeEach, describe, expect, it, vi } from "vitest";
import formatDateToDDMMYYYY from "@shared/utils/formatDateToDDMMYYYY";

describe ("dd/MM/yyyy Date Formatter Test.", () => {
    beforeEach (() => {
        vi.clearAllMocks();
    });

    it ("returns a formatted date when received a valid date.", () => {
        expect (formatDateToDDMMYYYY(new Date("2005-04-19"))).toBe("19/04/2005");
    });

    it ("returns 'Invalid Date' when date received is invalid.", () => {
        expect (formatDateToDDMMYYYY(new Date("Invalid date example..."))).toBe("Invalid Date");
    });
});