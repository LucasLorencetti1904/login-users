import { expect, Mock, vi } from "vitest";

const MockBirthDateValidator = vi.fn().mockImplementation((_field: any) => {}) as unknown as Mock & {
    new (field: any): any;
    wasNotCalled: () => void;
    willPass: () => void;
    willFail: () => void;
};

MockBirthDateValidator.wasNotCalled = () => {
    expect (MockBirthDateValidator).not.toHaveBeenCalled();
}

MockBirthDateValidator.willPass = () => {
    MockBirthDateValidator.mockImplementation(() => {});
};

MockBirthDateValidator.willFail = () => {
    MockBirthDateValidator.mockImplementation(() => {
        throw new Error();
    });
};

export default MockBirthDateValidator;