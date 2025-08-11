import { expect, Mock, vi } from "vitest";

const MockUsernameValidator = vi.fn().mockImplementation((_field: any) => {}) as unknown as Mock & {
    new (field: any): any;
    wasNotCalled: () => void;
    willPass: () => void;
    willFail: () => void;
};

MockUsernameValidator.wasNotCalled = () => {
    expect (MockUsernameValidator).not.toHaveBeenCalled();
}

MockUsernameValidator.willPass = () => {
    MockUsernameValidator.mockImplementation(() => {});
};

MockUsernameValidator.willFail = () => {
    MockUsernameValidator.mockImplementation(() => {
        throw new Error();
    });
};

export default MockUsernameValidator;