import { expect, Mock, vi } from "vitest";
import type PasswordHasher from "@interfaces/adapters/PasswordHasher";

export default class MockHasher implements PasswordHasher {
    public hash = vi.fn() ;
    public compare = vi.fn();

    public method(method: keyof MockHasher): any {
        return {
            willReturn: (password: string): void => {
                (this[method] as Mock).mockResolvedValue(password); 
            }
        };
    }

    public callHashMethodWithPassword(password: string): void {
        expect (this.hash as Mock).toHaveBeenCalledExactlyOnceWith(password);
    }

    public doNotCallHashMethod(): void {
        expect (this.hash as Mock).not.toHaveBeenCalled();
    }
}