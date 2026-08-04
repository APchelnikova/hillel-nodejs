# MongoDB Queries

## Завдання 1 Aggregation Pipeline

### 1. Порахувати кількість товарів у кожній категорії

Запит:

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      count: {
        $sum: 1
      }
    }
  }
]);
```

Результат:

```json
[
  {
    "_id": "electronics",
    "count": 3
  },
  {
    "_id": "clothing",
    "count": 2
  },
  {
    "_id": "food",
    "count": 2
  },
  {
    "_id": "books",
    "count": 2
  }
]
```

### 2. Порахувати середню ціну товарів по кожній категорії

Запит:

```js
db.products.aggregate([
  {
    $group: {
      _id: "$category",
      averagePrice: {
        $avg: "$price"
      }
    }
  }
]);
```

Результат:

```json
[
  {
    "_id": "books",
    "averagePrice": 40
  },
  {
    "_id": "clothing",
    "averagePrice": 105
  },
  {
    "_id": "food",
    "averagePrice": 10.5
  },
  {
    "_id": "electronics",
    "averagePrice": 1566.3333333333333
  }
]
```

### 3. Знайти сумарну вартість складу — суму price * stock по всіх товарах

Запит:

```js
db.products.aggregate([
  {
    $group: {
        _id: null,
        totalCost: {
            $sum: {
                $multiply: ["$price", "$stock"]
            }
        }
    }
  }, 
  { 
    $project: {
        _id: 0,
        category: "$_id",
        averagePrice: 1
    }
  }
]);
```

Результат:

```json
[
  {
    "totalCost": 24015
  }
]
```

### 4. Вивести тільки ті категорії, у яких середня ціна більша за 300

Запит:

```js
db.products.aggregate([
    {
        $group: {
            _id: "$category",
            averagePrice: { $avg: "$price" }
        }
    },
    {
        $match: {
            averagePrice: { $gt: 300 }
        }
    },
    {
        $project: {
            _id: 0,
            category: "$_id",
            averagePrice: 1
        }
    }
]);
```

Результат:

```json
[
  {
    "averagePrice": 1566.3333333333333,
    "category": "electronics"
  }
]
```

### 5. Порахувати кількість активних та неактивних користувачів

Запит:

```js
db.products.aggregate([
    {
        $group: {
            _id: "$isActive",
            count: {
                $sum: 1
            }
        }
    },
    {
        $project: {
            _id: 0,
            status: {
                $cond: [
                    {
                        $eq: ["$_id", true]
                    },
                    "active",
                    "inactive"
                ]
            },
            count: 1
        }
    }
]);
```

Результат:

```json
[
  {
    "count": 3,
    "status": "active"
  },
  {
    "count": 2,
    "status": "inactive"
  }
]
```

## Завдання 2 Індекси та швидкість запитів

### 1. Індекси в MongoDB

Індекс у MongoDB — це спеціальна структура даних, яка зберігає значення полів у відсортованому вигляді та посилання на відповідні документи. Завдяки індексу база даних не переглядає всю колекцію під час пошуку, а швидко знаходить потрібні записи. Це значно прискорює виконання запитів, особливо для великих колекцій.

### Різниця між COLLSCAN і IXSCAN

- **COLLSCAN (Collection Scan)** — MongoDB переглядає кожен документ у колекції, щоб знайти потрібні дані. Такий спосіб повільніший, особливо якщо документів багато.
- **IXSCAN (Index Scan)** — MongoDB використовує індекс для пошуку потрібних документів, тому не потрібно переглядати всю колекцію. Це значно швидше та ефективніше.

### 2. Перевірка індексів

Команда:

```js
db.products.getIndexes()
```

Результат:

```json
[
  {
    "v": 2,
    "key": { "_id": 1 },
    "name": "_id_"
  }
]
```
Команда:

```js
db.users.getIndexes()
```

Результат:

```json
[
  {
    "v": 2,
    "key": { "_id": 1 },
    "name": "_id_"
  },
  {
    "v": 2,
    "key": { "email": 1 },
    "name": "email_1",
    "unique": true
  }
]
```

**Висновок:** У колекції `users` було знайдено індекс `email_1`, який не створювався вручну. 
Він з'явився автоматично, тому що у файлі `userModel.js` для поля `email` вказано параметр `unique: true`.
Mongoose створює такий унікальний індекс під час роботи з моделлю, щоб не дозволяти зберігати користувачів з однаковими значеннями поля `email`.


### 3–4. Порівняння виконання запиту до та після створення індексу

Запит:

```js
db.products.createIndex({ category: 1 })
```

Результат:

```text
category_1
```

Запит:

```js
db.products.find({ category: "electronics" }).explain("executionStats")
```

### Порівняння результатів

| До створення індексу | Після створення індексу |
|-----------------------|-------------------------|
| `stage: COLLSCAN` | `stage: IXSCAN` |
| `totalDocsExamined: 9` | `totalDocsExamined: 3` |
| `totalKeysExamined: 0` | `totalKeysExamined: 3` |

**Висновок:** До створення індексу MongoDB виконувала повне сканування колекції (`COLLSCAN`) і переглядала всі документи. Після створення індексу на полі `category` використовується `IXSCAN`, тому переглядаються лише потрібні ключі індексу та відповідні документи, що робить пошук ефективнішим.

### Перевірка унікальності поля `email`

Запит:

```js
db.users.insertOne({
  name: "Test User",
  email: "sofia@example.com",
  age: 25
})
```

Помилка:

```text
MongoServerError: E11000 duplicate key error collection: shopDB.users 
index: email_1 dup key: { email: "sofia@example.com" }
```

**Висновок:** Помилка виникла, тому що в колекції вже існує користувач із таким значенням `email`. У файлі `userModel.js` для поля `email` встановлено `unique: true`, тому Mongoose створила унікальний індекс `email_1`, який не дозволяє зберігати документи з однаковими значеннями поля `email`.