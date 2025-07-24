import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import { BirthDateValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaDataValidator";

export default class BirthDateValidator extends VanillaDataValidator<BirthDateValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("BirthDate");

    private readonly MAX_AGE: number = 100;
    private readonly MIN_AGE: number = 0;

    private birthDay: number;
    private birthMonth: number;
    private birthYear: number;

    constructor(private birthDate: Date) {
        super(birthDate);

        this.birthDay = birthDate.getDate();
        this.birthMonth = birthDate.getMonth() + 1;
        this.birthYear = birthDate.getFullYear(); 

        this.validate();
    }

    protected createError(message: string): BirthDateValidationError {
        return new BirthDateValidationError(message);
    }

    public validate(): void {
        this.failsIf (
            this.hasAnInvalidDateFormat(), this.errorMessage.hasAnInvalidFormat
        );

        this.failsIf (
            this.hasAnInvalidDay(), this.errorMessage.hasInvalid("day")
        );

        this.failsIf (
            this.hasAnInvalidMonth(), this.errorMessage.hasInvalid("month")
        );

        this.failsIf (
            this.hasAnInvalidYear(), this.errorMessage.hasInvalid("year")
        );
    }

    private hasAnInvalidDateFormat(): boolean {
        return this.birthDate.toDateString() == "Invalid Date";
    }
    
    private hasAnInvalidMonth(): boolean {
        return this.birthMonth > 12 || this.birthMonth < 1;
    }
    
    private hasAnInvalidDay(): boolean {
        const daysInMonth: number = this.calculateDaysOfMonth();
        
        return this.birthDay > daysInMonth || this.birthDay < 1;
    }
    
    private calculateDaysOfMonth(): number {
        return new Date(this.birthYear, this.birthMonth, 0).getDate();
    }

    private hasAnInvalidYear(): boolean {
        const currentYear: number = new Date().getFullYear();
        
        const supposedAge: number = currentYear - this.birthYear;

        return supposedAge < this.MIN_AGE || supposedAge > this.MAX_AGE;
    }
}