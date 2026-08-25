function printId<T extends { id: number }>(obj: T): T {
    console.log(obj.id);
    return obj;
}

const user = printId({ id: 1, email: "a@test.com" });
user.email;   // має працювати, тип не втрачено

// printId({ name: "Alice" });   // має бути помилка: немає id
// printId({ id: "abc" });       // має бути помилка: id не число
