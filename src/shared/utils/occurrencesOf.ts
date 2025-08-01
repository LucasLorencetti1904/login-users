export default function occurrencesOf(char: string, expression: string): number {
    return expression.split(char).length - 1;
}