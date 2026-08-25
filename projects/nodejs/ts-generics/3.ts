function swap<A, B>(arr: [A, B]): [B, A] {
    return [arr[1], arr[0]];
}

const r = swap(["Аліна", 26]); // [number, string]

console.log(r); // [26, "Аліна"]

// TS2322: Type number is not assignable to type string