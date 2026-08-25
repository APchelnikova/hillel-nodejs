interface User {
    id: number;
    name: string;
}

// А
function logValue(value: unknown): void {
    console.log(value);
}


// Б
function parseJson(json: string): unknown {
    return JSON.parse(json);
}

const user = parseJson('{"id": 1}');

logValue(user);