function wrapInArray<T>(value: T): T[] {
    return [value];
}

const a = wrapInArray(5);         // number[]
const b = wrapInArray("hello");   // string[]
