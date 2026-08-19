"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const book = {
    id: 1,
    title: "1984",
    author: { name: "George Orwell", country: "UK" },
    year: 1949,
    pages: 339
};
const book1 = {
    id: 2,
    title: "American Psycho",
    author: { name: "Bret Easton Ellis", country: "US" },
    year: 1991,
    pages: 399,
    genre: "Horror",
    rating: 10
};
function printBook(book) {
    console.log(`${book.title} - ${book.author.name}`);
    if (book.genre) {
        console.log(`Genre: ${book.genre}`);
    }
    if (book.rating) {
        console.log(`Rating: ${book.rating}`);
    }
}
//book.id = 99
printBook(book);
printBook(book1);
const library = [
    {
        id: 1,
        title: "1984",
        author: { name: "George Orwell", country: "US" },
        year: 1949,
        pages: 339,
        genre: "Dystopian fiction",
        rating: 9.5
    },
    {
        id: 2,
        title: "American Psycho",
        author: { name: "Bret Easton Ellis", country: "US" },
        year: 1991,
        pages: 399,
        genre: "Psychological thriller",
        rating: 10
    },
    {
        id: 3,
        title: "The Lovely Bones",
        author: { name: "Alice Sebold", country: "US" },
        year: 2002,
        pages: 372,
        genre: "Mystery thriller",
    },
    {
        id: 4,
        title: "The Hunger Games",
        author: { name: "Suzanne Collins", country: "US" },
        year: 2008,
        pages: 496,
    }
];
function getRecentBooks(books, afterYear) {
    return books
        .filter(book => book.year > afterYear)
        .map(book => book.title);
}
const recentBooks = getRecentBooks(library, 2000);
console.log(recentBooks);
//# sourceMappingURL=hw.js.map