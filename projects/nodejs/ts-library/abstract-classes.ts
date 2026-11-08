// Завдання 3 : Абстрактний клас

import { ItemStatus } from "./enum";

abstract class LibraryItem {
    protected title: string;
    protected year: number;
    #status: ItemStatus = ItemStatus.Available;

    constructor(title: string, year: number) {
        this.title = title;
        this.year = year;
    }

    get status(): ItemStatus {
        return this.#status;
    }

    borrow(): void {
        if (this.#status === ItemStatus.Borrowed) {
            console.log(`"${this.title}" is already borrowed`);
            return;
        }
        this.#status = ItemStatus.Borrowed;
    }

    abstract describe(): string;
}

// Завдання 4: Два нащадки

class Book extends LibraryItem implements Searchable {
    protected author: string;

    constructor(title: string, year: number, author: string) {
        super(title, year);
        this.author = author;
    }

    describe(): string {
        return `Book: ${this.title} (${this.year}), author ${this.author}`;
    }

    matches(query: string): boolean {
        const q = query.toLowerCase();
        return this.title.toLowerCase().includes(q)
            || this.author.toLowerCase().includes(q);
    }
}

class Magazine extends LibraryItem {
    protected issueNumber: number;

    constructor(title: string, year: number, issueNumber: number) {
        super(title, year);
        this.issueNumber = issueNumber;
    }

    describe(): string {
        return `Magazine: ${this.title}, issue №${this.issueNumber}`;
    }
}

//const item = new LibraryItem('American Psycho', 1991);
// error TS2511: Cannot create an instance of an abstract class.

// Завдання 5: інтерфейс Searchable

interface Searchable {
    matches(query: string): boolean;
}

// Завдання 6: Поліморфізм

const items: LibraryItem[] = [
    new Book('American Psycho', 1991, 'Bret Easton Ellis'),
    new Book('The Lovely Bones', 2002, 'Alice Sebold'),
    new Book('The Hunger Games', 2008, 'Suzanne Collins'),
    new Magazine('Vogue', 2026, 42),
];

for (const item of items) {
    console.log(item.describe());
}

// "Book: American Psycho (1991), author Bret Easton Ellis"
// "Book: The Lovely Bones (2002), author Alice Sebold"
// "Book: The Hunger Games (2008), author Suzanne Collins"
// "Magazine: Vogue, issue №42"

const book = new Book('The Lovely Bones', 2002,'Alice Sebold');
console.log(book.describe()); // Book: The Lovely Bones (2002), author Alice Sebold

console.log(book.status); // "AVAILABLE"
book.borrow();
console.log(book.status); // "BORROWED"

const magazine = new Magazine('Vogue', 2026, 42);
console.log(magazine.describe()); // Magazine: Vogue, issue №42

console.log(book.matches('lovely')); // true