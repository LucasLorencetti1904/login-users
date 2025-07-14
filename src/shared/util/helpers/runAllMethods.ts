export default function runAllMethods(o: object): void {
    const classPrototype = Object.getPrototypeOf(o);
    const classProperties = Object.getOwnPropertyNames(classPrototype);

    classProperties.forEach(propertyName => {
        const method = classPrototype[propertyName];
        const isMethod = typeof method === "function";
        const isNotConstructor = propertyName != "constructor";

        if (isMethod && isNotConstructor)
            method.call(o);
    });
}