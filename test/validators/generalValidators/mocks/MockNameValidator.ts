import { expect, Mock, vi } from "vitest";

const MockNameValidator = vi.fn().mockImplementation((_field: any) => {}) as unknown as Mock & {
    new (field: any): any;
    wasNotCalled: () => void;
    willPass: () => void;
    willFail: () => void;
};

MockNameValidator.wasNotCalled = () => {
    expect (MockNameValidator).not.toHaveBeenCalled();
}

MockNameValidator.willPass = () => {
    MockNameValidator.mockImplementation(() => {});
};

MockNameValidator.willFail = () => {
    MockNameValidator.mockImplementation(() => {
        throw new Error();
    });
};

export default MockNameValidator;