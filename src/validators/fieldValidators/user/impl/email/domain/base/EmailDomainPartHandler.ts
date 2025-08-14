import type EmailPartHandler from "@interfaces/validators/EmailPartHandler";
import ErrorMessageGenerator from "@shared/helpers/ErrorMessageGenerator";
import EmailDomainSubPartsHandler from "@validators/fieldValidators/user/impl/email/domain/base/EmailDomainSubPartsHandler";
import failsIf from "@shared/utils/failsIf";
import ocurrencesOf from "@shared/utils/occurrencesOf";

export default class EmailDomainPartHandler implements EmailPartHandler {
    protected errorMessage: ErrorMessageGenerator = ErrorMessageGenerator.initWithDataName("Email domain");

    private static readonly DOT: string = ".";
    private static readonly MAXIMUM_NUMBER_OF_DOTS: number = 2;

    constructor (
        private readonly TLDHandler: EmailDomainSubPartsHandler,
        private readonly SLDHandler: EmailDomainSubPartsHandler,
        private readonly CountryCodeHandler: EmailDomainSubPartsHandler
    ) {}

    public handle(domain: string): void {
        failsIf (
            this.hasInvalidNumberOfDots(domain), this.errorMessage.hasAnInvalidFormat
        );
        
        const domainParts: string[] = this.splitDomainInLevelParts(domain);
    
        this.handleDomainParts(domainParts);
    }
    
    private splitDomainInLevelParts(domain: string): string[] {
        return domain.split(EmailDomainPartHandler.DOT);
    }
    
    private hasInvalidNumberOfDots(domain: string): boolean {
        return this.hasNoDots(domain) || this.hasManyDots(domain);
    }
    
    private hasNoDots(domain: string): boolean {
        return this.getNumberOfDots(domain) < 1;
    }
    
    private hasManyDots(domain: string): boolean {
        return this.getNumberOfDots(domain) > EmailDomainPartHandler.MAXIMUM_NUMBER_OF_DOTS;
    }
    
        private getNumberOfDots(domain: string): number {
            return ocurrencesOf(EmailDomainPartHandler.DOT, domain);
        }
    
    private handleDomainParts(domainParts: string[]): void {
        const [SLD, TLD, countryCode] = domainParts;

        try {
            this.TLDHandler.handle(TLD);
            this.SLDHandler.handle(SLD);
            this.CountryCodeHandler.handle(countryCode);
        }

        catch(e: unknown) {
            throw e as Error;
        }
    }
}