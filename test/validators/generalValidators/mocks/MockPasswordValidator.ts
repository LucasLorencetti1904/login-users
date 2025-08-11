import { Mock, vi } from "vitest";

const MockPasswordValidator = vi.fn().mockImplementation((_field: any) => {}) as unknown as Mock & {
    new (field: any): any;
    willPass: () => void;
    willFail: () => void;
};

MockPasswordValidator.willPass = () => {
    MockPasswordValidator.mockImplementation(() => {});
};

MockPasswordValidator.willFail = () => {
    MockPasswordValidator.mockImplementation(() => {
        throw new Error();
    });
};

export default MockPasswordValidator;