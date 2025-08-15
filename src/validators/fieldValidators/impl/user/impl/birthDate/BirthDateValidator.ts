import UserFieldValidator from "@validators/fieldValidators/impl/user/impl/UserFieldValidator";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";

type DateSet = {
    day: number;
    month: number;
    year: number;
};

export default class BirthDateValidator extends UserFieldValidator {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Birth Date");

    private readonly DATE_FORMAT: RegExp = /^\d{4}-\d{2}-\d{2}$/;

    private readonly MAX_AGE: number = 100;
    private readonly MIN_AGE: number = 0;

    public validate(birthDate: string): void {
        let birthDateParts = this.splitValidDateOrThrowError(birthDate);
    
        const birthDateSet: DateSet = this.toBirthDateSet(birthDateParts);

        this.failsIf (
            this.hasAnInvalidDay(birthDateSet), this.errorMessage.hasInvalid("day")
        );

        this.failsIf (
            this.hasAnInvalidMonth(birthDateSet), this.errorMessage.hasInvalid("month")
        );

        this.failsIf (
            this.hasAnInvalidYear(birthDateSet), this.errorMessage.hasInvalid("year")
        );
    }
    
    private splitValidDateOrThrowError(birthDate: string): string[] {
        this.throwErrorIfInvalid(birthDate);
        return this.splitDate(birthDate);
    }

    private throwErrorIfInvalid(birthDate: string): void {
        this.failsIf (
            this.hasAnInvalidDateFormat(birthDate), this.errorMessage.hasAnInvalidFormat
        );
    }
    
    private hasAnInvalidDateFormat(birthDate: string): boolean {
        return !this.DATE_FORMAT.test(birthDate); 
    }

    private splitDate(birthDate: string): string[] {
        return birthDate.split("-");
    }

    private toBirthDateSet(dateParts: string[]): DateSet {
        return {
            day: Number(dateParts[2]),
            month: Number(dateParts[1]),
            year: Number(dateParts[0])
        };
    }
    
    private hasAnInvalidYear(date: DateSet): boolean {
        const currentYear: number = new Date().getFullYear();
        
        const supposedAge: number = currentYear - date.year;
        
        return supposedAge < this.MIN_AGE || supposedAge > this.MAX_AGE;
    }
    
    private hasAnInvalidMonth(date: DateSet): boolean {
        return date.month < 1 || date.month > 12;
    }
    
    private hasAnInvalidDay(date: DateSet): boolean {
        const daysInMonth: number = this.calculateDaysOfMonth(date);
        
        return date.day > daysInMonth || date.day < 1;
    }
    
    private calculateDaysOfMonth(date: DateSet): number {
        return new Date(date.year, date.month, 0).getDate();
    }
}