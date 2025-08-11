import { Mock, vi } from "vitest";

const MockEmailValidator = vi.fn().mockImplementation((_field: any) => {}) as unknown as Mock & {
    new (field: any): any;
    willPass: () => void;
    willFail: () => void;
};

MockEmailValidator.willPass = () => {
    MockEmailValidator.mockImplementation(() => {});
};

MockEmailValidator.willFail = () => {
    MockEmailValidator.mockImplementation(() => {
        throw new Error();
    });
};

export default MockEmailValidator;