export default class ErrorMessageGenerator {
    public isEmpty: string;
    public hasAnInvalidFormat: string;

    private constructor(private fieldName: string) {
        this.fieldName = fieldName.trim();

        this.isEmpty = `${this.fieldName} cannot be empty.`
        this.hasAnInvalidFormat = `${this.fieldName} must have a valid format.`;
    }
    
    public static initWithDataName(fieldName: string): ErrorMessageGenerator {
        return new ErrorMessageGenerator(fieldName);
    }

    public contains(element: string): string {
        return `${this.fieldName} cannot contain ${element}.`;
    }

    public missing(element: string): string {
        return `${this.fieldName} must contain "${element}".`;
    }

    public startsWith(element: string): string {
        return `${this.fieldName} cannot start with ${element}.`;
    }

    public minLength(minLength: number): string {
        return `${this.fieldName} must be at least ${minLength} characters.`;
    }

    public maxLength(maxLength: number): string {
        return `${this.fieldName} must be at most ${maxLength} characters.`;
    }
}