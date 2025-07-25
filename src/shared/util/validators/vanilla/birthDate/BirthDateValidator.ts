import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import { BirthDateValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaDataValidator";
import quantityOf from "../../../../helpers/quantityOf";

export default class BirthDateValidator extends VanillaDataValidator<BirthDateValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("BirthDate");

    private readonly MAX_AGE: number = 100;
    private readonly MIN_AGE: number = 0;

    private day: number;
    private month: number;
    private year: number;
    
    constructor(private birthDate: string) {
        super(birthDate);

        this.day = this.getbirthDay();
        this.month = this.getbirthMonth();
        this.year = this.getbirthYear();

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
    
    private splitDate(): string[] {
        return this.birthDate.split("-");
    }
    
    private HasAnInvalidDateFormat(): boolean {
        return new Date(this.birthDate).toDateString() == "Invalid Date"; 
    }
    
    private hasAnInvalidMonth(): boolean {
        return this.month > 12 || this.month < 1;
    }
    
    private hasAnInvalidDay(): boolean {
        const daysInMonth: number = this.calculateDaysOfMonth();
        
        return this.day > daysInMonth || this.day < 1;
    }
    
    private calculateDaysOfMonth(): number {
        return new Date(this.year, this.month, 0).getDate();
    }

    private hasAnInvalidYear(): boolean {
        const currentYear: number = new Date().getFullYear();
        
        const supposedAge: number = currentYear - this.year;

        return supposedAge < this.MIN_AGE || supposedAge > this.MAX_AGE;
    }
}