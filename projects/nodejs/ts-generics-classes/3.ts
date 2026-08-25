class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    size(): number {
        return this.items.length;
    }
}

const q = new Queue<string>();
q.enqueue("a");
q.enqueue("b");
console.log(q.dequeue());   // "a"
console.log(q.size());      // 1

//q.enqueue(42);
// error TS2345: Argument of type number is not assignable to parameter of type string