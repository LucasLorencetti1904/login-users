import ErrorMessageGenerator from "../../../../helpers/ErrorMessageGenerator";
import { BirthDateValidationError } from "../../../errors/DataValidationError";
import VanillaDataValidator from "../VanillaDataValidator";

export default class BirthDateValidator extends VanillaDataValidator<BirthDateValidationError> {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("BirthDate");

    private readonly DATE_FORMAT: RegExp = /^\d{4}-\d{2}-\d{2}$/;

    private readonly MAX_AGE: number = 100;
    private readonly MIN_AGE: number = 0;
    
    private day: number;
    private month: number;
    private year: number;

    constructor(private birthDate: string) {
        super(birthDate);

        const [year, month, day] = this.splitValidDateOrThrowError();

        this.day = Number(day);
        this.month = Number(month);
        this.year = Number(year);
            
        this.validate();
    }

    protected createError(message: string): BirthDateValidationError {
        return new BirthDateValidationError(message);
    }

    public validate(): void {
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
    
    private splitValidDateOrThrowError(): string[] {
        this.throwErrorIfInvalid();
        return this.splitDate();
    }

    private throwErrorIfInvalid(): void {
        this.failsIf(this.hasAnInvalidDateFormat(), this.errorMessage.hasAnInvalidFormat);
    }
    
    private hasAnInvalidDateFormat(): boolean {
        return !this.DATE_FORMAT.test(this.birthDate); 
    }

    private splitDate(): string[] {
        return this.birthDate.split("-");
    }  
    
    private hasAnInvalidYear(): boolean {
        const currentYear: number = new Date().getFullYear();
        
        const supposedAge: number = currentYear - this.year;
        
        return supposedAge < this.MIN_AGE || supposedAge > this.MAX_AGE;
    }
    
    private hasAnInvalidMonth(): boolean {
        return this.month < 1 || this.month > 12;
    }
    
    private hasAnInvalidDay(): boolean {
        const daysInMonth: number = this.calculateDaysOfMonth();
        
        return this.day > daysInMonth || this.day < 1;
    }
    
    private calculateDaysOfMonth(): number {
        return new Date(this.year, this.month, 0).getDate();
    }
}