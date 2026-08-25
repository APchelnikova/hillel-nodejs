interface Result<T> {
    success: boolean;
    data: T;
    timestamp: Date;
}

const stringResult: Result<string> = {
    success: true,
    data: "Success result",
    timestamp: new Date()
};

const numberArrayResult: Result<number[]> = {
    success: true,
    data: [1, 2, 3, 4, 5],
    timestamp: new Date()
};

console.log(stringResult);
console.log(numberArrayResult);