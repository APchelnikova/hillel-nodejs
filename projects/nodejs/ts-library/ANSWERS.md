# Відповіді

## Завдання 1

Рядковий enum використовується замість числового, тому що його значення (`"AVAILABLE"`, `"BORROWED"`, `"LOST"`) зрозуміліші, легше читаються під час налагодження та зручніші для передачі через API.

## Завдання 5

Так, код запрацював би і без `implements`. TypeScript використовує структурну типізацію: об'єкт вважається `Searchable`, якщо в нього є метод `matches(query: string): boolean`, а явне оголошення не потрібне. До того ж інтерфейси існують лише під час компіляції й зникають із JavaScript.

Слово `implements` лише просить компілятор перевірити клас одразу в місці його оголошення. Якщо метод забули або написали з помилкою (наприклад, `match` замість `matches`), помилка з'явиться біля класу, а не десь далі в коді, де об'єкт передають як `Searchable`.[9. polymorphism.ts](../../../../../Downloads/TypeScript-Lessons-Lesson-4/practice/9.%20polymorphism.ts)

## Завдання 7

**Що зникло повністю:**
- усі анотації типів: `: string`, `: number`, `: ItemStatus`, `: void`;
- модифікатор `protected` у полів `title` і `year`;
- слово `abstract` перед класом — у JavaScript це звичайний `class LibraryItem`, і його можна створити через `new`;
- абстрактний метод `describe()` — у нього немає тіла, тому від нього не лишилось нічого.

**Що залишилось:**
- клас `LibraryItem`, його конструктор, гетер `status` і метод `borrow()` з усією логікою;
- поля `title` і `year` (вже без типів і без `protected`);
- приватне поле `#status` — це справжня приватність JavaScript, вона працює і під час виконання;
- значення enum `"AVAILABLE"`, `"BORROWED"`, `"LOST"` — enum не зник, бо використовується як значення в коді.

**Чи з'явились рядки, яких я не писала:**
Так. Замість `enum ItemStatus { ... }` з'явився код, який створює звичайний об'єкт:

    var ItemStatus;
    (function (ItemStatus) {
        ItemStatus["Available"] = "AVAILABLE";
        ItemStatus["Borrowed"] = "BORROWED";
        ItemStatus["Lost"] = "LOST";
    })(ItemStatus || (ItemStatus = {}));

Також на початку файлу з'явився рядок `"use strict";`.

**Висновок:** типи, `protected` і `abstract` — це лише перевірки TypeScript під час компіляції, у JavaScript їх немає. Enum і `#status` — частини самого JavaScript, тому вони залишаються.