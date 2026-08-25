function getLast<T>(arr: T[]): T | undefined {
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
}

const n = getLast([1, 2, 3]);    // має бути number | undefined
const s = getLast(["a", "b"]);   // має бути string | undefined
const e = getLast([]);           // undefined