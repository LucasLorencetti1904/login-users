export default function capitalize(expression: string) {
    expression = expression.toLowerCase();
    
    const firstChar: string = expression[0].toUpperCase();
    const otherChars: string = expression.slice(1);
    
    return firstChar + otherChars;
}