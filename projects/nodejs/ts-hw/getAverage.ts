function getAverage(numbers: number[]): number {
    if (!numbers?.length) {
        return 0;
    }

    const sum = numbers.reduce((acc, num) => acc + num, 0);

    return sum / numbers?.length;
}

console.log(getAverage([4, 12, 3, 6, 5]));