const arr: number[] = [1, 2, 3];

const reverseArray = (arr: number[]): number[] => {
    return arr.reverse();
};

const reversedArr = reverseArray(arr);

console.log(reversedArr);
console.log(arr);
console.log(reversedArr === arr);