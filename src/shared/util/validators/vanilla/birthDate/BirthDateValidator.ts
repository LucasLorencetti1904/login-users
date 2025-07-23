import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import { BirthDateValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaDataValidator";

export default class BirthDateValidator extends VanillaDataValidator<BirthDateValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("BirthDate");

    constructor(private birthDate: Date) {
        super(birthDate);

        this.validate();
    }

    protected createError(message: string): BirthDateValidationError {
        return new BirthDateValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.isEmpty(), this.errorMessage.hasAnInvalidFormat
        );
    }

    private hasInvalid(): boolean {
        return !this.birthDate;
    }

    private dateDoesNotExists(): boolean {
        
    }

    private calculateDaysOfMonth(month: number): number {
        if (month > 12 || month < 1) return NaN;

        let year = this.getBirthYear();

        return new Date(year, month, 0).getDate();
    }

    private getBirthYear(): number {
        return this.birthDate.getFullYear();
    }

    private isAnInvalidMonth(): boolean {
        const month: number = this.getBirthMonth();
        
        return month > 12 || month < 1;
    }

    private isAnInvalidDay(): boolean {
        const day: number = this.getBirthDay();
        const month: number = this.getBirthMonth();

        const daysInBirthMonth: number = this.calculateDaysOfMonth(month);

        return day > daysInBirthMonth || day < 1
    }
    
    private getBirthDay(): number {
        return this.birthDate.getDay();
    }

    private getBirthMonth(): number {
        return this.birthDate.getMonth() + 1;
    }
}