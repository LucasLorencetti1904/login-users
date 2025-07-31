import { describe, beforeAll, vi, it, expect } from "vitest";
import formatDateToDDMMYYYY from "@shared/utils/formatDateToDDMMYYYY";

let date: Date;

describe ("Date Formatter Function Test", () => {
    beforeAll (() => {
        vi.clearAllMocks();
    });

    it (`returns "19/04/2005" when it receives 'new Date("2005-04-19")'.`, () => {
        date = new Date("2005-04-19");
        expect (formatDateToDDMMYYYY(date)).toBe("19/04/2005");
    });

    it (`returns "Invalid Date" when it receives a invalid date.`, () => {
        date = new Date("Invalid Example");
        expect (formatDateToDDMMYYYY(date)).toBe("Invalid Date");
    });
});