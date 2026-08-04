# Project Name

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Environment variables

Create a `.env` file based on `.env.example`.

Example:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopDB
```

## Run the project

1. Development mode:

   ```bash
   npm run dev
   ```

2. Production mode:

   ```bash
   npm start
   ```

## Обробка помилок

### 1. Некоректний Id товару

**Метод:** `GET`

**URL:**

```text
http://localhost:5000/api/products/123abc
```

**Тіло запиту:** відсутнє.

**Очікуваний статус:**

```text
400 Bad Request
```

**Очікуване тіло відповіді:**

```json
{
  "message": "Invalid product ID"
}
```

### 2. Недопустима категорія товару

Поле `category` може містити лише значення `electronics`, `books`, `clothing` або `food`.

**Метод:** `POST`

**URL:**

```text
http://localhost:5000/api/products
```

**Заголовок:**

```text
Content-Type: application/json
```

**Тіло запиту:**

```json
{
  "name": "Toy Car",
  "price": 25,
  "category": "toys",
  "stock": 10
}
```

**Очікуваний статус:**

```text
400 Bad Request
```

**Очікуване тіло відповіді:**

```json
{
  "message": "Validation failed",
  "errors": {
    "category": "`toys` is not a valid enum value for path `category`."
  }
}
```

### 3. Помилка валідації декількох полів

У цьому запиті обов’язкові поля `price` і `stock` відсутні.

**Метод:** `POST`

**URL:**

```text
http://localhost:5000/api/products
```

**Заголовок:**

```text
Content-Type: application/json
```

**Тіло запиту:**

```json
{
  "name": "Redmi Note 9",
  "category": "electronics"
}
```

**Очікуваний статус:**

```text
400 Bad Request
```

**Очікуване тіло відповіді:**

```json
{
  "message": "Validation failed",
   "errors": {
      "price": "Path `price` is required.",
      "stock": "Path `stock` is required."
   }
}
```

### 5. Неіснуючий маршрут

**Метод:** `GET`

**URL:**

```text
http://localhost:5000/api/test
```

**Тіло запиту:** відсутнє.

**Очікуваний статус:**

```text
404 Not Found
```

**Очікуване тіло відповіді:**

```json
{
  "message": "Route not found"
}
```

## Кешування

Результат запиту `GET /api/products` кешується в пам'яті на 30 секунд. 
Якщо протягом цього часу хтось створить новий товар,
кеш залишиться застарілим і новий товар не з'явиться у відповіді до завершення часу життя кешу.
Це можна виправити, очищаючи або оновлюючи кеш після створення, оновлення чи видалення товарів.