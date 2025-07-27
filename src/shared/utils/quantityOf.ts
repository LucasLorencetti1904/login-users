type ObjectWithOtherFunction = {
    in: (expression: string) => number
};

export default function quantityOf(char: string): ObjectWithOtherFunction {
    return {
        in: (expression) => {
            return expression.split(char).length - 1;
        }
    }
}